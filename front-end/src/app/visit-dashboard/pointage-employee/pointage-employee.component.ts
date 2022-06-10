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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  isPoind = false;

  stagiaires: any = []
  isStagiaire = false

  vehicules: any = []
  isVehicule = false
  matricule_vhc: any;

  pointed_at: any; // si l"employée est déjà pointé à un autre locaux

  closeResult = ''; //pour les modals

  constructor(
    private authServ: AuthService,
    private datePipe: DatePipe,
    private toast: NgToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    this.heure = new Date();
    setTimeout(() => {
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}');
      this.lieu = Lieu.lieu_name;

      //trie décroissant, ze tonga farany no  eo ambony
      this.pointages.sort((b: any, a: any) => a.entry_time.localeCompare(b.entry_time));
    }, 700);
    this.refreshPointageList();
    this.getEmployeeList();
    this.getStagiaireList();
    this.refreshVehiculeList()
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refreshVehiculeList() {
    this.authServ.getVehiculeList().subscribe((data) => {
      this.vehicules = data;
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
    if (this.isVehicule) {
      for (let index = 0; index < this.vehicules.length; index++) {
        const element = this.vehicules[index];
        if (element.numero_matricule == this.matricule_vhc) {
          return element.department_name
        }
      }
    }
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
    if (this.isVehicule) {
      return this.matricule_vhc
    }
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

  //Methode pour les modals
  showModal(content: any) {
    this.enteredValue = ""
    this.refreshPointagesThisLieuList();
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll()
  }

  //Methode de pointage entré
  onEnter() {
    if (!this.isEmployee() && !this.isVehicule) {
      this.showError("Vérifier bien le nom")
    }
    else {
      this.date = new Date();
      this.heure = new Date();
      this.heure = this.datePipe.transform(this.date, 'h:mm:ss a');
      this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      if (this.isPointed()) {
        this.showError(this.enteredValue + ' déjà présent à ' + this.pointed_at)
      }
      else {
        if (this.isVehicule) {
          this.pointageVehicule()
        }
        else {
          //pointage stagiaire
          if (this.isStagiaire) {
            this.pointageStagiaire()
          }
          else {
            this.pointageEmployee()
          }
        }
        setTimeout(() => {
          this.enteredValue = '';
        }, 500);
        this.refreshPointagesThisLieuList()
      }
    }
  }
  pointageVehicule() {
    const val = {
      numero_matricule: this.matricule_vhc,
      date: this.date.toString(),
      lieu: this.lieu,
      entry_time: this.heure.toString()
    }

    this.authServ.addPointageVehicule(val).subscribe((res) => {
      if (res.toString() == "Pointage vehicule added successfully") {
        this.showSuccess("Pointage Véhicule réussi")
        this.addAnimation()
        this.closeModal()
      }
      else this.showError("Erreur interne")
    })
    //Pour modifier le pointed_at
    const stg = {
      numero_matricule: this.matricule_vhc,
      pointed_at: this.lieu,
    }
    this.authServ.putVehicule(stg).subscribe((res) => { });
  }
  pointageStagiaire() {
    if (this.checkValidDate(this.getStgEndDate(this.enteredValue))) {
      var val2 = {
        stagiaire_name: this.enteredValue,
        date: this.date.toString(),
        lieu: this.lieu,
        entry_time: this.heure.toString()
      };
      this.authServ.addPointageStg(val2).subscribe((res) => {
        if (res.toString() == 'Pointage stagiaire added successfully') {
          this.showWarning('Stagiaire : fin du période le : ' + this.getStgEndDate(val2.stagiaire_name))
          this.addAnimation()
          this.closeModal()
        } else {
          this.showError("erreur interne, contacter les developpeurs")
        }
      });
      //Pour modifier le pointed_at
      const stg = {
        stagiaire_name: this.enteredValue,
        pointed_at: this.lieu,
        isActif: false
      }
      this.authServ.putStagiaire(stg).subscribe((res) => { });
    } else {
      this.showError("Période de stage déjà terminé, pointer le dans la visite")
    }

  }
  pointageEmployee() {
    const matricule = this.getNumeroMatricule(this.enteredValue)
    var val1 = {
      numero_matricule: matricule,
      employee_name: this.enteredValue,
      date: this.date.toString(),
      employee_dep_name: this.getDep(this.enteredValue),
      lieu: this.lieu,
      entry_time: this.heure.toString(),
    }
    this.authServ.addPointage(val1).subscribe((res) => {
      if (res.toString() == 'Added successfully') {
        this.showSuccess("Pointage d'entrée reussi")
        this.addAnimation()
        this.closeModal();
      } else { this.showError("Il y a une erreur interne") }
    });
    //Pour modifier le pointed_at
    const emp = {
      numero_matricule: this.getNumeroMatricule(this.enteredValue),
      pointed_at: this.lieu,
    };
    this.authServ.putEmployee(emp).subscribe((res) => { });

  }

  //Methode de pointage sortie
  onExit() {
    if (!this.isPointed()) {
      this.showError("Vérifier bien le nom")
    } else {
      //enregistrement dans pointage register
      this.addPointageRegister(this.enteredValue);
      if (this.isStagiaire) {
        this.sortieStg()
      }
      else {
        if (this.isVehicule) {
          this.sortieVehicule()
        }
        else this.sortieEmployee()
      }

      //animation sortie
      this.pointages = this.pointages.filter((f: any) => { return f.employee_name != this.enteredValue })
    }
  }
  sortieEmployee() {
    const emp = {
      numero_matricule: this.getNumeroMatricule(this.enteredValue),
      employee_name: this.enteredValue,
      pointed_at: 'not pointed',
    };
    this.authServ.putEmployee(emp).subscribe((res) => {
    });
    this.authServ.deletePointage(emp).subscribe((data) => {
      if (data.toString() == 'Delete successfully') {
        this.showSuccess('Pointage de sortie bien reussi');
        this.closeModal();
        this.enteredValue = '';
      } else {
        this.showError("Erreur interne")
      }
    });

  }
  sortieStg() {
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
          this.showSuccess('Pointage de sortie bien reussi')
          this.closeModal()
          this.enteredValue = '';
        } else {
          this.showError("Erreur interne")
        }
      });
  }
  sortieVehicule() {
    //Pour modifier le pointed_at
    const stg = {
      numero_matricule: this.matricule_vhc,
      employee_name: this.enteredValue,
      pointed_at: "non actif"
    }
    this.authServ.putVehicule(stg).subscribe((res) => {
    });
    this.authServ.deletePointage(stg).subscribe((data) => {
      if (data.toString() == 'Delete successfully') {
        this.showSuccess('Pointage de sortie véhicule bien reussi');
        this.closeModal();
        this.enteredValue = '';
      } else {
        this.showError("Erreur interne")
      }
    });
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
        element.employee_name == this.enteredValue || element.numero_matricule == this.enteredValue
      ) {
        this.pointed_at = element.lieu;
        return true;
      }
    }
    return false;
  }
  isEmployee(): boolean {
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (
        element.employee_name == this.enteredValue
      ) {
        return true;
      }
    }
    for (let index = 0; index < this.stagiaires.length; index++) {
      const element = this.stagiaires[index];
      if (
        element.stagiaire_name == this.enteredValue
      ) {
        return true;
      }
    }
    return false;
  }

  //Pour les suggestion
  suggestedEmp(employee_name: string) {
    this.isStagiaire = this.isVehicule = false
    this.enteredValue = employee_name;
  }
  suggestedStg(employee_name: string) {
    this.isVehicule = false
    this.isStagiaire = true
    this.enteredValue = employee_name;
  }
  suggestedVehicule(item: any) {
    this.isStagiaire = false
    this.isVehicule = true
    this.enteredValue = item.numero_matricule;
    this.matricule_vhc = item.numero_matricule
  }
  suggestedExit(name: string, item: any) {
    this.enteredValue = name;
    if (this.isStg(item)) {
      this.isVehicule = false
      this.isStagiaire = true
    }
    else if (this.isVhc(name)) {
      this.matricule_vhc = item.numero_matricule
      this.isVehicule = true
      this.isStagiaire = false
    }
    else {
      this.isVehicule = this.isStagiaire = false
    }
  }

  isStg(item: any) {
    for (let index = 0; index < this.stagiaires.length; index++) {
      const element = this.stagiaires[index];
      if (element.stagiaire_name == item.employee_name) return true
    }
    return false
  }
  isVhc(name: string) {
    for (let index = 0; index < this.vehicules.length; index++) {
      const element = this.vehicules[index];
      if (element.numero_matricule == name) return true
    }
    return false
  }

  addAnimation() {
    //Pour animation d'ajout
    const matricule = this.getNumeroMatricule(this.enteredValue)
    var val1 = {
      numero_matricule: this.matricule_vhc,
      employee_name: this.enteredValue,
      date: this.date.toString(),
      employee_dep_name: this.getDep(this.enteredValue),
      lieu: this.lieu,
      entry_time: this.heure.toString(),
    }
    //pour animation
    setTimeout(() => {
      this.pointages.unshift(val1)
    }, 500);
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
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (
        element.employee_name == employee_name
      ) {
        this.heure = new Date();
        this.heure = this.datePipe.transform(this.heure, 'h:mm:ss a');
        var val = {
          function: element.function,
          numero_matricule: this.getNumeroMatricule(employee_name),
          date: element.date,
          lieu: element.lieu,
          employee_name: element.employee_name,
          employee_dep_name: element.employee_dep_name,
          entry_time: element.entry_time,
          exit_time: this.heure.toString(),
        };
        this.authServ.addPointageRegister(val).subscribe((res) => {
        });

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