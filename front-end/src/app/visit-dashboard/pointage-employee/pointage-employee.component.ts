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

  stagiaires: any = []
  isStagiaire = false


  pointed_at: any; // si l"employée est déjà pointé à un autre locaux

  constructor(
    private authServ: AuthService,
    private datePipe: DatePipe,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    this.heure = new Date();
    setTimeout(() => {
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}');
      this.lieu = Lieu.lieu_name;
      console.log('pointages = ' + this.pointages.length)

      //trie décroissant, ze tonga farany no  eo ambony
      this.pointages.sort((b: any, a: any) => a.entry_time.localeCompare(b.entry_time));
    }, 700);
    this.refreshPointageList();
    this.getEmployeeList();
    this.getStagiaireList();

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
        this.pointagesbyLieu.push(element);
      }
    }
  }

  getEmployeeList() {
    this.authServ.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });
  }

  getStagiaireList() {
    this.authServ.getStagiaireList().subscribe((data) => {
      this.stagiaires = data;
    });
  }

  getDep(name: string) {
    if (this.isStagiaire) {
      for (let index = 0; index < this.stagiaires.length; index++) {
        const element = this.stagiaires[index];
        if (element.stagiaire_name == name) {
          return element.department_name
        }
      }
    }
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (element.employee_name == name) {
        return element.department_name
      }
    }
    return 'None'
  }

  getInPointageList(name: string): any {
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
    return "stagiaire";
  }

  getStgEndDate(name: string) {
    for (let index = 0; index < this.stagiaires.length; index++) {
      const element = this.stagiaires[index];
      if (element.stagiaire_name == name) {
        return element.end_date
      }
    }
    return "erreur "
  }

  //Methode de pointage entré
  OnEnter() {
    this.date = new Date();
    this.heure = new Date();
    if (this.isPointed()) {
      this.showError('Employé déjà présent à ' + this.pointed_at)
    }
    else {
      this.heure = this.datePipe.transform(this.date, 'h:mm:ss');
      this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');

      //Pour animation d'ajout
      const matricule = this.getNumeroMatricule(this.enteredValue)
      var val1 = {
        numero_matricule: matricule,
        employee_name: this.enteredValue,
        date: this.date.toString(),
        employee_dep_name: this.getDep(this.enteredValue),
        lieu: this.lieu,
        entry_time: this.heure.toString(),
      }

      //pointage stagiaire
      if (this.isStagiaire) {
        
        if (this.checkValidDate(this.getStgEndDate(this.enteredValue))) {
          var val2 = {
            stagiaire_name: this.enteredValue,
            date: this.date.toString(),
            lieu: this.lieu,
            entry_time: this.heure.toString()
          };
          this.authServ.addPointageStg(val2).subscribe((res) => {
            if (res.toString() == 'Pointage stagiaire added successfully') {
              console.log(val2.stagiaire_name)
              this.showWarning('Stagiaire : fin du période le : ' + this.getStgEndDate(val2.stagiaire_name))
            } else {
              alert("erreur interne, contacter les developpeurs")
              //this.showError("erreur interne, contacter les developpeurs")
            }
          });
          //Pour modifier le pointed_at
          const stg = {
            stagiaire_name: this.enteredValue,
            pointed_at: this.lieu,
            isActif: false
          }
          this.authServ.putStagiaire(stg).subscribe((res) => { });
          //pour animation
          setTimeout(() => {
            this.pointages.unshift(val1)
          }, 500);
        } else {
          this.showError("Période de stage déjà terminé, pointer le dans la visite")
        }
      }
      else {
        this.authServ.addPointage(val1).subscribe((res) => {
          if (res.toString() == 'Added successfully') {
            this.showSuccess("Pointage d'entrée reussi")
            //pour animation
            setTimeout(() => {
              this.pointages.unshift(val1)
            }, 500);
          } else { this.showError("Il y a une erreur interne") }
        });
        //Pour modifier le pointed_at
        const emp = {
          numero_matricule: this.getNumeroMatricule(this.enteredValue),
          pointed_at: this.lieu,
        };
        this.authServ.putEmployee(emp).subscribe((res) => { });
      }
    }
    this.enteredValue = '';
    this.refreshPointagesThisLieuList()
  }
  //Methode de pointage sortie
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

      //Pour modifier le pointed_at de employée
      console.log("isStagiaire = " + this.isStagiaire)
      if (!this.isStagiaire) {
        const emp = {
          numero_matricule: this.getNumeroMatricule(this.enteredValue),
          employee_name: this.enteredValue,
          pointed_at: 'not pointed',
        };
        this.authServ.putEmployee(emp).subscribe((res) => {
        });
        this.authServ
          .deletePointage(emp)
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
      }
      else {
        const stg = {
          stagiaire_name: this.enteredValue,
          employee_name: this.enteredValue,
          pointed_at: "not pointed",
          isActif: false
        }
        this.authServ.putStagiaire(stg).subscribe((res) => {
        });
        this.authServ
          .deletePointage(stg)
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

      }

      //animation sortie
      this.pointages = this.pointages.filter((f: any) => { return f.employee_name != this.enteredValue })

    }
    this.enteredValue = '';
  }

  //Pour les stagiaires
  checkValidDate(dateStr: string) {
    const today = new Date()
    const date = new Date(dateStr);
    if (today.getTime() < date.getTime()) {
      return true
    }
    return false
  }

  isPointed(): boolean {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (
        element.employee_name == this.enteredValue
      ) {
        this.pointed_at = element.lieu;
        return true;
      }
    }
    return false;
  }

  //Pour les suggestion
  suggestedEmp(employee_name: string) {
    this.isStagiaire = false
    this.enteredValue = employee_name;
  }
  suggestedStg(employee_name: string) {
    this.isStagiaire = true
    this.enteredValue = employee_name;
  }
  suggestedExit(name: any) {
    this.enteredValue = name;
    if (this.isStg(name)) {
      this.isStagiaire = true
      console.log(this.isStagiaire)
    }
    else this.isStagiaire = false
  }

  isStg(name: string) {
    for (let index = 0; index < this.stagiaires.length; index++) {
      const element = this.stagiaires[index];
      if (element.stagiaire_name == name) return true
    }
    return false
  }

  getPointageInList(employee_name: string) {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.employee_name == employee_name) {
        return index
      }
    }
    return undefined
  }

  addPointageRegister(employee_name: string) {
    if (this.isStg(employee_name)) {
      for (let index = 0; index < this.pointages.length; index++) {

        const element = this.pointages[index];
        if (
          element.employee_name == employee_name
        ) {
          this.heure = new Date();
          this.heure = this.datePipe.transform(this.heure, 'h:mm:ss');
          var val1 = {
            function: "stagiaire",
            date: element.date,
            lieu: element.lieu,
            employee_name: element.employee_name,
            employee_dep_name: element.employee_dep_name,
            entry_time: element.entry_time,
            exit_time: this.heure.toString(),
          };
          this.authServ.addPointageRegister(val1).subscribe((res) => {
            console.log(res.toString() + ' to the pointage register');
          });

        }
      }
    }
    else {
      //ajout dans le registre des pointages des employées
      for (let index = 0; index < this.pointages.length; index++) {

        const element = this.pointages[index];
        if (
          element.employee_name == employee_name
        ) {
          this.heure = new Date();
          this.heure = this.datePipe.transform(this.heure, 'h:mm:ss');
          var val = {
            numero_matricule: this.getNumeroMatricule(employee_name),
            date: element.date,
            lieu: element.lieu,
            employee_name: element.employee_name,
            employee_dep_name: element.employee_dep_name,
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

  //les messages
  showError(msg: string) {
    this.toast.error({
      detail: 'Erreur',
      summary: msg,
      duration: 3000,
    });
  }
  showSuccess(msg: string) {
    this.toast.success({
      detail: 'SUCCES',
      summary: msg,
      duration: 3000,
    })
  }
  showWarning(msg: string) {
    this.toast.warning({
      detail: 'SUCCES',
      summary: msg,
      duration: 3000,
    })
  }
  showInfo() {
    this.toast.info({
      detail: 'ATTENTION',
      summary: 'Bien saisir et bien verifier le nom',
      duration: 5000,
    });
  }
}