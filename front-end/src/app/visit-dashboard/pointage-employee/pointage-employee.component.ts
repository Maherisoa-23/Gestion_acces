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
  @Input() anarana = '';

  lieu = '';
  pointages: any = [];
  pointagesbyLieu: any = [];
  employees: any = [];
  date: any;
  heure: any;
  isPoind = false;

  stagiaires: any = [];
  isStagiaire = false;

  vehicules: any = [];
  isVehicule = false;
  matricule_vhc: any;

  pointed_at: any; // si l"employée est déjà pointé à un autre locaux

  closeResult = ''; //pour les modals
  tags: any = [];
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
      this.pointages.sort((b: any, a: any) =>
        a.entry_time.localeCompare(b.entry_time)
      );
    }, 700);
    this.refreshPointageList();
    this.getEmployeeList();
    this.getStagiaireList();
    this.refreshVehiculeList();
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
          return element.department_name;
        }
      }
    }
    if (this.isStagiaire) {
      for (let index = 0; index < this.stagiaires.length; index++) {
        const element = this.stagiaires[index];
        if (element.stagiaire_name == name) {
          return element.department_name;
        }
      }
    }
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (element.employee_name == name) {
        return element.department_name;
      }
    }
    return 'None';
  }

  getInPointageList(name: string): any {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.employee_name == name) {
        return element;
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
    if (this.isStg(name)) {
      return 'stagiaire';
    }
    return this.matricule_vhc;
  }

  getStgEndDate(name: string) {
    for (let index = 0; index < this.stagiaires.length; index++) {
      const element = this.stagiaires[index];
      if (element.stagiaire_name == name) {
        return element.end_date;
      }
    }
    return 'erreur ';
  }

  getPointageId(name : string) {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.employee_name == name) {
        return element.pointage_id
      }
    }
  }

  //Methode pour les modals
  showModal(content: any) {
    this.enteredValue = '';
    this.refreshPointagesThisLieuList();
    this.modalService.open(content, { centered: true, size: 'xl' });
  }
  closeModal() {
    this.modalService.dismissAll();
    if (this.isVehicule) {
      setTimeout(() => {
        this.reinitialisation()
      }, 3000);
    }
    else {
      this.reinitialisation()
    }
  }
  reinitialisation() {
    this.isStagiaire = false;
    this.isVehicule = false;
    this.enteredValue = "";
    this.tags = []
  }

  //Methode de pointage entré
  onEnter() {
    if (this.isVehicule) {
      for (let index = 0; index < this.tags.length; index++) {
        const element = this.tags[index];
        setTimeout(() => {
          this.pointage(element)
        }, 1000 + index * 500);
      }
    }
    this.pointage(this.enteredValue);
  }
  pointage(entiteName: string) {
    if (!this.isEmployee(entiteName) && !this.isVehicule) {
      this.showError('Vérifier bien le nom');
    } else {
      this.date = new Date();
      this.heure = new Date();
      this.heure = this.datePipe.transform(this.date, 'h:mm:ss a');
      this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      if (this.isPointed(entiteName)) {
        this.showError(
          this.enteredValue + ' déjà présent à ' + this.pointed_at
        );
      } else {
        if (this.isVhc(entiteName)) {
          console.log("pointage vehicule")
          this.pointageVehicule();
        } else {
          //pointage stagiaire
          if (this.isStg(entiteName)) {
            console.log("pointage stagiaire")
            this.pointageStagiaire(entiteName);
          } else {
            console.log("pointage employee")
            this.pointageEmployee(entiteName);
          }
        }
        setTimeout(() => {
          this.enteredValue = '';
        }, 500);
        this.refreshPointagesThisLieuList();
      }
    }
  }
  pointageVehicule() {
    const val = {
      numero_matricule: this.matricule_vhc,
      date: this.date.toString(),
      lieu: this.lieu,
      entry_time: this.heure.toString(),
    };

    this.authServ.addPointageVehicule(val).subscribe((res) => {
      if (res.toString() == 'Pointage vehicule added successfully') {
        this.showSuccess('Pointage Véhicule réussi');
        this.addAnimation(this.enteredValue);
        this.closeModal();
      } else this.showError('Erreur interne');
    });
    //Pour modifier le pointed_at
    const stg = {
      numero_matricule: this.matricule_vhc,
      pointed_at: this.lieu,
    };
    this.authServ.putVehicule(stg).subscribe((res) => { });
  }
  pointageStagiaire(name : string) {
    if (this.checkValidDate(this.getStgEndDate(name))) {
      var val2 = {
        numero_matricule : "stagiaire",
        stagiaire_name: name,
        date: this.date.toString(),
        lieu: this.lieu,
        entry_time: this.heure.toString(),
      };
      this.authServ.addPointageStg(val2).subscribe((res) => {
        if (res.toString() == 'Pointage stagiaire added successfully') {
          if (!this.isVehicule) {
            this.showWarning(
              'Stagiaire : fin du période le : ' +
              this.getStgEndDate(val2.stagiaire_name)
            );
          }
          this.addAnimation(name);
          this.closeModal();
        } else {
          this.showError('erreur interne, contacter les developpeurs');
        }
      });
      //Pour modifier le pointed_at
      const stg = {
        stagiaire_name: name,
        pointed_at: this.lieu,
        isActif: false,
      };
      this.authServ.putStagiaire(stg).subscribe((res) => { });
    } else {
      this.showError(
        'Période de stage déjà terminé pour' + name
      );
    }
  }
  pointageEmployee(name : string) {
    const matricule = this.getNumeroMatricule(name);
    var val1 = {
      numero_matricule: matricule,
      employee_name: name,
      date: this.date.toString(),
      employee_dep_name: this.getDep(name),
      lieu: this.lieu,
      entry_time: this.heure.toString(),
    };
    this.authServ.addPointage(val1).subscribe((res) => {
      if (res.toString() == 'Added successfully') {
        if (!this.isVehicule) {
          this.showSuccess("Pointage d'entrée reussi");
        }
        this.addAnimation(name);
        this.closeModal();
      } else {
        this.showError('Il y a une erreur interne');
      }
    });
    //Pour modifier le pointed_at
    const emp = {
      numero_matricule: this.getNumeroMatricule(name),
      pointed_at: this.lieu,
    };
    this.authServ.putEmployee(emp).subscribe((res) => { });
  }

  //Methode de pointage sortie
  onExit() {   
    if (this.isVehicule) {
      for (let index = 0; index < this.tags.length; index++) {
        const element = this.tags[index];
        setTimeout(() => {
          this.sortie(element)
        }, 1000 + index * 500);
      }
    }
    this.sortie(this.enteredValue);
  }

  sortie(name : string) {
    if (!this.isPointed(name)) {
      this.showError('Vérifier bien le nom');
    } else {
      //enregistrement dans pointage_register
      this.addPointageRegister(name);
      if (this.isStg(name)) {
        this.sortieStg(name);
      } else {
        if (this.isVhc(name)) {
          this.sortieVehicule();
        } else this.sortieEmployee(name);
      }
      //animation sortie
      this.pointages = this.pointages.filter((f: any) => {
        return f.employee_name != name;
      });
    }
  }
  sortieEmployee(name : string) {
    const emp = {
      numero_matricule: this.getNumeroMatricule(name),
      employee_name: name,
      pointed_at: 'non actif',
    };
    this.authServ.putEmployee(emp).subscribe((res) => { });
    this.deletePointage(name)
  }
  sortieStg(name: string) {
    const stg = {
      stagiaire_name: name,
      employee_name: name,
      pointed_at: 'non actif',
      isActif: false,
    };
    this.authServ.putStagiaire(stg).subscribe((res) => { });
    this.deletePointage(name)
  }
  sortieVehicule() {
    //Pour modifier le pointed_at
    const stg = {
      numero_matricule: this.matricule_vhc,
      employee_name: this.enteredValue,
      pointed_at: 'non actif',
    };
    this.authServ.putVehicule(stg).subscribe((res) => { });
    this.deletePointage(this.enteredValue)
  }

  deletePointage(name : string) {
    const id = this.getPointageId(name)
    this.authServ.deletePointage(id).subscribe((data) => {
      if (data.toString() == 'deleted successfully') {
        this.showSuccess('Pointage de sortie bien reussi');
        this.closeModal();
        this.enteredValue = '';
      } else {
        this.showError('Erreur interne');
      }
    }); 
  }

  //Pour les stagiaires
  checkValidDate(dateStr: string) {
    const today = new Date();
    const date = new Date(dateStr);
    if (today.getTime() < date.getTime()) {
      return true;
    }
    return false;
  }

  isPointed(name: string): boolean {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (
        element.employee_name == name ||
        element.numero_matricule == name
      ) {
        this.pointed_at = element.lieu;
        return true;
      }
    }
    return false;
  }
  isEmployee(name: string): boolean {
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (element.employee_name == name) {
        return true;
      }
    }
    for (let index = 0; index < this.stagiaires.length; index++) {
      const element = this.stagiaires[index];
      if (element.stagiaire_name == name) {
        return true;
      }
    }
    return false;
  }

  //Pour les suggestion
  suggestedEmp(employee_name: string) {
    this.isStagiaire = this.isVehicule = false;
    this.enteredValue = employee_name;
  }
  suggestedStg(employee_name: string) {
    this.isVehicule = false;
    this.isStagiaire = true;
    this.enteredValue = employee_name;
  }
  suggestedVehicule(item: any) {
    this.isStagiaire = false;
    this.isVehicule = true;
    this.enteredValue = item.numero_matricule;
    this.matricule_vhc = item.numero_matricule;
  }
  suggestedExit(name: string, item: any) {
    this.enteredValue = name;
    if (this.isStg(item.employee_name)) {
      this.isVehicule = false;
      this.isStagiaire = true;
    } else if (this.isVhc(name)) {
      this.matricule_vhc = item.numero_matricule;
      this.isVehicule = true;
      this.isStagiaire = false;
    } else {
      this.isVehicule = this.isStagiaire = false;
    }
  }

  isStg(name: string) {
    for (let index = 0; index < this.stagiaires.length; index++) {
      const element = this.stagiaires[index];
      if (element.stagiaire_name == name) return true;
    }
    return false;
  }
  isVhc(name: string) {
    for (let index = 0; index < this.vehicules.length; index++) {
      const element = this.vehicules[index];
      if (element.numero_matricule == name) return true;
    }
    return false;
  }

  addAnimation(name : string) {
    //Pour animation d'ajout
    const matricule = this.getNumeroMatricule(name);
    var val1 = {
      numero_matricule: matricule,
      employee_name: name,
      date: this.date.toString(),
      employee_dep_name: this.getDep(name),
      lieu: this.lieu,
      entry_time: this.heure.toString(),
    };
    //pour animation
    setTimeout(() => {
      this.pointages.unshift(val1);
    }, 500);
  }

  getPointageInList(employee_name: string) {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.employee_name == employee_name) {
        return index;
      }
    }
    return undefined;
  }

  addPointageRegister(employee_name: string) {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.employee_name == employee_name) {
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
        this.authServ.addPointageRegister(val).subscribe((res) => { });
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
    });
  }
  showWarning(msg: string) {
    this.toast.warning({
      detail: 'SUCCES',
      summary: msg,
      duration: 3000,
    });
  }
  showInfo() {
    this.toast.info({
      detail: 'ATTENTION',
      summary: 'Bien saisir et bien verifier le nom',
      duration: 5000,
    });
  }

  //pour la liste des employéesdans un véhicule
  addTag(item: string) {
    this.tags.push(item);
    setTimeout(() => {
      this.anarana = '';
    }, 500);
    // this.refreshPointagesThisLieuList();
  }
  removeTag(tag: string) {
    this.tags.pop(tag);
  }
}
