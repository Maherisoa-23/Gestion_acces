import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-pointage-employee',
  templateUrl: './pointage-employee.component.html',
  styleUrls: ['./pointage-employee.component.css'],
  providers: [DatePipe]
})
export class PointageEmployeeComponent implements OnInit {

  @Input() numero_matricule = 0;
  @Input() password = "";

  lieu = "";
  pointages: any = [];
  employees: any = [];
  date: any;
  heure: any;
  isEmp = false;
  isPoind = false;

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

  getEmployeeList() {
    this.authServ.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });
  }

  OnEnter() {
    if (!this.isEmployee()) {
      alert("numéro matricule ou mot de passe incorrect!");
    }
    else {
      if (this.isPointed()) {
        alert("Employé déjà présent");
      }
      else {
        this.date = new Date();
        this.heure = new Date();
        this.heure = this.datePipe.transform(this.date, 'h:mm:ss a');
        this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        var val = {
          numero_matricule: this.numero_matricule,
          date: this.date.toString(),
          lieu: this.lieu,
          entry_time: this.heure.toString()
        };
        this.authServ.addPointage(val).subscribe((res) => {
          console.log(res.toString() + " to the pointage list");
        });
        setTimeout(() => {
          this.refreshPointageList();
        }, 500);
        this.numero_matricule = 0
        this.password = "";
      }
    }

  }

  OnExit() {
    if (!this.isEmployee()) {
      alert("numéro matricule ou mot de passe incorrect!");
      this.numero_matricule = 0
      this.password = ""
    }
    else {
      if (!this.isPointed()) {
        alert("Employé non présent ou déjà parti");
        this.numero_matricule = 0
        this.password = ""
      }
      else {
        this.authServ.deletePointage(this.numero_matricule).subscribe((data) => {
          console.log(data.toString() + " from the active pointage ");
        });
        //ajout dans le registre des pointages
        for (let index = 0; index < this.pointages.length; index++) {
          const element = this.pointages[index];
          if (
            element.numero_matricule == this.numero_matricule
          ) {
            this.heure = new Date();
            this.heure = this.datePipe.transform(this.heure, 'h:mm:ss a');
            var val = {
              numero_matricule: this.numero_matricule,
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
            break;
          };
        }
      }
    }

    setTimeout(() => {
      this.refreshPointageList();
    }, 500);
    console.log("refreshed")
    this.numero_matricule = 0
    this.password = ""
  }

  isEmployee(): boolean {
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
  }

  isPointed(): boolean {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (
        element.numero_matricule == this.numero_matricule
      ) {
        return true
      };
    }
    return false
  }

}
