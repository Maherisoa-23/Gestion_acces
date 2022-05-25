import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-pointage-employee',
  templateUrl: './pointage-employee.component.html',
  styleUrls: ['./pointage-employee.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter , :leave', [animate(1000)]),
    ]),
  ],
})
export class PointageEmployeeComponent implements OnInit {
  @Input() enteredValue = '';

  lieu = '';
  pointages: any = [];
  pointagesbyLieu: any = [];
  employees: any = [];
  date: any;
  heure: any;
  isEmp = false;
  isPoind = false;

  pointed_at: any; // si l"employée est déjà pointé à un autre locaux

  constructor(
    private authServ: AuthService,
    private datePipe: DatePipe,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}');
      this.lieu = Lieu.lieu_name;
      console.log('pointages = ' + this.pointages.length)

      //trie décroissant, ze tonga farany no eo ambony
      this.pointages.sort((b : any,a : any) => a.entry_time.localeCompare(b.entry_time));
    }, 700);
    this.refreshPointageList();
    this.getEmployeeList();
    
  }

  showInfo() {
    this.toast.info({
      detail: 'ATTENTION',
      summary: 'Bien saisir et bien verifier le nom',
      duration: 5000,
    });
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refreshPointagesThisLieuList() {
    this.pointagesbyLieu = [];
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.lieu == this.lieu) {
        this.showInfo();
        this.pointagesbyLieu.push(element);
      }
    }
  }

  getEmployeeList() {
    this.authServ.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });
  }


  getDep(name : string) {
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (element.employee_name == name){
        return element.department_name
      }
    }
    return 'None'
  }

  OnEnter() {
    if (this.isPointed()) {
      this.toast.warning({
        detail: 'Erreur',
        summary: 'Employé déjà présent à ' + this.pointed_at,
        duration: 3000,
      });
      // alert('Employé déjà présent à : ' + this.pointed_at);
    } else {
      this.date = new Date();
      this.heure = new Date();
      this.heure = this.datePipe.transform(this.date, 'h:mm:ss');
      this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');

      //Pour animation d'ajout
      const matricule = this.getNumeroMatricule(this.enteredValue)
      var val1 = {
        numero_matricule: matricule,
        employee_name : this.enteredValue,
        date: this.date.toString(),
        employee_dep_name : this.getDep(this.enteredValue),
        lieu: this.lieu,
        entry_time: this.heure.toString(),
      }
      setTimeout(() => {
        console.log("direction : " + val1.employee_dep_name)
        this.pointages.unshift(val1)
      }, 500);


      var val = {
        numero_matricule: this.getNumeroMatricule(this.enteredValue),
        date: this.date.toString(),
        lieu: this.lieu,
        entry_time: this.heure.toString(),
      };
      this.authServ.addPointage(val).subscribe((res) => {
        if (res.toString() == 'Added successfully') {
          this.toast.success({
            detail: 'SUCCES',
            summary: 'Pointage d entrée reussi',
            duration: 3000,
          });
        } else {
          this.toast.error({
            detail: 'DESOLE',
            summary: 'Pointage impossible',
            duration: 3000,
          });
        }
      });
      //Pour modifier le pointed_at
      const emp = {
        numero_matricule: this.getNumeroMatricule(this.enteredValue),
        pointed_at: this.lieu,
      };
      this.authServ.putEmployee(emp).subscribe((res) => {
        //console.log(res.toString());
      });
    }
    this.enteredValue = '';
  }

  getInPointageList(name : string) : any {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.employee_name == name) {
        return element
      }
    }
  }

  getNumeroMatricule(name: string) {
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (element.employee_name == name) {
        return element.numero_matricule;
      }
    }
    return 0;
  }

  OnExit() {
    if (!this.isPointed()) {
      this.toast.warning({
        detail: 'OOhh',
        summary: 'Employé non présent ou déjà parti',
        duration: 5000,
      });
      // alert('Employé non présent ou déjà parti');
      this.enteredValue = '';
    } else {

      //enregistrement dans pointage register
      this.addPointageRegister(this.enteredValue);

      //Pour modifier le pointed_at
      const emp = {
        numero_matricule: this.getNumeroMatricule(this.enteredValue),
        pointed_at: 'not pointed',
      };
      this.authServ.putEmployee(emp).subscribe((res) => {
      });
      this.authServ
        .deletePointage(this.getNumeroMatricule(this.enteredValue))
        .subscribe((data) => {
          if (data.toString() == 'Delete successfully') {
            this.toast.success({
              detail: 'SUCCES',
              summary: 'Pointage de sortie bien reussi',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: 'ERREUR',
              summary: 'Erreur de pointage ',
              duration: 5000,
            });
          }
        });
      
      //animation sortie
      this.pointages = this.pointages.filter((f : any) => { return f.employee_name != this.enteredValue})

      
    }
    this.enteredValue = '';
  }

  isPointed(): boolean {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (
        element.numero_matricule == this.getNumeroMatricule(this.enteredValue)
      ) {
        this.pointed_at = element.lieu;
        return true;
      }
    }
    return false;
  }

  suggested(employee_name: string) {
    this.enteredValue = employee_name;
  }

  getPointageInList(employee_name : string) {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.employee_name == employee_name) {        
        return index
      }
    }
    return undefined
  }

  addPointageRegister(employee_name : string) {
    //ajout dans le registre des pointages
    for (let index = 0; index < this.pointages.length; index++) {
      
      const element = this.pointages[index];
      if (
        element.employee_name == employee_name
      ) {
        this.heure = new Date();
        this.heure = this.datePipe.transform(this.heure, 'h:mm:ss a');
        var val = {
          numero_matricule: this.getNumeroMatricule(employee_name),
          date: element.date,
          lieu: element.lieu,
          employee_name: element.employee_name,
          employee_dep: element.employee_dep,
          entry_time: element.entry_time,
          exit_time: this.heure.toString(),
        };
        this.authServ.addPointageRegister(val).subscribe((res) => {
          console.log(res.toString() + ' to the pointage register');
        });
        
      }
    }
  }
}