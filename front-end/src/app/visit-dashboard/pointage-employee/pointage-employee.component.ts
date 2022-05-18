import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pointage-employee',
  templateUrl: './pointage-employee.component.html',
  styleUrls: ['./pointage-employee.component.css'],
  providers: [DatePipe]
})
export class PointageEmployeeComponent implements OnInit {

  @Input() enteredValue = "";


  lieu = "";
  pointages: any = [];
  pointagesbyLieu : any = []
  employees: any = [];
  date: any;
  heure: any;
  isEmp = false;
  isPoind = false;

  pointed_at : any; // si l"employée est déjà pointé à un autre locaux

  constructor(private authServ: AuthService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    setTimeout(() => {
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}')
      this.lieu = Lieu.lieu_name
    }, 1000);;
    this.refreshPointageList();
    this.getEmployeeList();
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refreshPointagesThisLieuList() {
    this.pointagesbyLieu = []
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.lieu == this.lieu) {
        this.pointagesbyLieu.push(element)
      }
    }
  }

  getEmployeeList() {
    this.authServ.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });
  }

  OnEnter() {
    if (this.isPointed()) {
      alert("Employé déjà présent à : " + this.pointed_at);
    }
    else {
      this.date = new Date();
      this.heure = new Date();
      this.heure = this.datePipe.transform(this.date, 'h:mm:ss a');
      this.date = this.datePipe.transform(this.date, "dd:MM:yyyy");
      var val = {
        numero_matricule: this.getNumeroMatricule(this.enteredValue),
        date: this.date.toString(),
        lieu: this.lieu,
        entry_time: this.heure.toString()
      };
      this.authServ.addPointage(val).subscribe((res) => {
        console.log(res.toString() + " to the pointage list");
      });
      const emp = {
        numero_matricule: this.getNumeroMatricule(this.enteredValue),
        pointed_at: this.lieu
      }
      this.authServ.putEmployee(emp).subscribe((res) => {
        console.log(res.toString());
      });
      setTimeout(() => {
        this.refreshPointageList();
      }, 500);
      
    }
    this.enteredValue = ""
  }

  getNumeroMatricule(name : string) {
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (element.employee_name == name) {
        return element.numero_matricule
      }
    }
    return 0
  }
  OnExit() {

    if (!this.isPointed()) {
      alert("Employé non présent ou déjà parti");
      this.enteredValue = ""
    }
    else {
      this.authServ.deletePointage(this.getNumeroMatricule(this.enteredValue)).subscribe((data) => {
        console.log(data.toString() + " from the active pointage ");
      });
      //ajout dans le registre des pointages
      for (let index = 0; index < this.pointages.length; index++) {
        const element = this.pointages[index];
        if (
          element.numero_matricule == this.getNumeroMatricule(this.enteredValue)
        ) {
          this.heure = new Date();
          this.heure = this.datePipe.transform(this.heure, 'h:mm:ss a');
          var val = {
            numero_matricule: this.getNumeroMatricule(this.enteredValue),
            date: element.date,
            lieu: element.lieu,
            employee_name: element.employee_name,
            employee_dep: element.employee_dep,
            entry_time: element.entry_time,
            exit_time: this.heure.toString()
          };
          this.authServ.addPointageRegister(val).subscribe((res) => {
            console.log(res.toString() + " to the pointage register");
          });
          const emp = {
            numero_matricule: this.getNumeroMatricule(this.enteredValue),
            pointed_at: "not pointed"
          }
          this.authServ.putEmployee(emp).subscribe((res) => {
            console.log(res.toString() + " from the employee list");
          });
          break;
        };
      }
    }

    setTimeout(() => {
      this.refreshPointageList();
    }, 500);
    console.log("refreshed")
    this.enteredValue = ""
  }

  /* isEmployee(): boolean {
    const md5 = new Md5()
    const pass = md5.appendStr(this.password).end().toString()
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (
        element.numero_matricule == this.numero_matricule &&
        element.password == pass
      ) {
        return true
      };
    }
    return false
  } */

  isPointed(): boolean {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (
        element.numero_matricule == this.getNumeroMatricule(this.enteredValue)
      ) {
        this.pointed_at = element.lieu
        return true
      };
    }
    return false
  }

  suggested(employee_name : string){
    this.enteredValue = employee_name;
  }

}
