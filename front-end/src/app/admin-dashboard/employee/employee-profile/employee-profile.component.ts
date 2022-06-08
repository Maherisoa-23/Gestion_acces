import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
  providers: [DatePipe],
})
export class EmployeeProfileComponent implements OnInit {
  employees: any;
  departments: any;
  isEdit = false;

  @Input() employee_name = '';
  @Input() function = '';
  // @Input() direction = '';
  @Input() numero_matricule = 0;

  pointage_register: any;
  matricule_security = 5;
  last_pointage: any;
  last_pointage_lieu = '';
  last_pointage_date = '';
  pointages: any = [];

  myChartPointage: any;

  trie_lieu = false;
  lieu_croissant = false;
  trie_date = false;
  date_croissant = false;

  photoPath = '';

  //pour le chart.js
  today: any;
  date: any;
  dateTab: any = [];

  photoName = 'Tojo.png';
  direction = '';
  fonction = '';

  constructor(
    private SecurityServ: SecurityAgentService,
    private authServ: AuthService,
    private route: Router,
    private location: Location,
    private toast: NgToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.reinitialisationDonnee();
    this.refreshPointageRegisterList();
    this.refreshDepList();
    this.refreshEmployeeList();
    if (this.SecurityServ.security_name == '')
      this.route.navigate(['/admin/employee-list']);
    this.last_pointage_lieu = this.SecurityServ.pointed_at;
    this.refreshPointageRegisterList();
    if (this.SecurityServ.matricule_security != 0)
      this.matricule_security = this.SecurityServ.matricule_security;
    this.initialisationData();
    setTimeout(() => {
      this.getLastPointageBySec(this.matricule_security);
    }, 500);
  }

  initialisationData() {
    this.employee_name = this.SecurityServ.security_name;
    this.photoName = this.SecurityServ.photoName;
    this.direction = this.SecurityServ.direction;
    this.fonction = this.SecurityServ.fonction;
    this.photoPath = this.authServ.PhotoUrl + this.photoName;
  }

  reinitialisationDonnee() {
    this.isEdit = false;
    this.employee_name = this.direction = this.function = '';
    this.numero_matricule = 0;
    this.photoName = 'anonymous.png';
    this.photoPath = this.authServ.PhotoUrl + this.photoName;
  }
  refreshDepList() {
    this.authServ.getDepartmentList().subscribe((data) => {
      this.departments = data;
    });
  }

  refreshEmployeeList() {
    this.authServ.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointage_register = data;
    });
  }

  getLastPointageBySec(matricule: number) {
    for (let index = 0; index < this.pointage_register.length; index++) {
      const element = this.pointage_register[index];
      if (element.numero_matricule == matricule) {
        this.pointages.push(element);
        this.last_pointage = element;
      }
    }
    this.last_pointage_date = this.last_pointage.date;
    this.last_pointage_lieu = this.last_pointage.lieu;
  }

  //Methode pour les modals
  showModal(content: any) {
    this.modalService.open(content, { centered: true });
    this.editEmployee()
  }
  closeModal() {
    this.modalService.dismissAll()
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.authServ.UploadPhoto(formData).subscribe((data) => {
      this.photoName = data.toString();
      this.photoPath = this.authServ.PhotoUrl + this.photoName;
    });
  }

  updateEmployee() {
    if (
      this.employee_name == '' ||
      this.function == '' ||
      this.direction == '' ||
      this.numero_matricule == 0
    ) {
      this.showError('Vérifier bien tous les informations');
    } else {
      const val = {
        employee_name: this.employee_name,
        numero_matricule: this.numero_matricule,
        function: this.function,
        department_name: this.direction,
        photoName: this.photoName,
        pointed_at: 'not pointed',
      };
      this.authServ.updateEmployeeEntity(val).subscribe((res) => {
        if (res.toString() == 'Updated Successfully!!') {
          this.showSuccess('Employée modifié avec succès');
          this.closeModal()
        }
      });
    }
  }

  editEmployee() {
    this.isEdit = true;
    this.employee_name = this.SecurityServ.security_name;
    this.function = this.SecurityServ.fonction;
    this.direction = this.SecurityServ.direction;
    this.numero_matricule = this.SecurityServ.matricule_security;
    this.photoName = this.SecurityServ.photoName;
    this.photoPath = this.authServ.PhotoUrl + this.photoName;
    this.showInfo('Verifier bien les informations');
  }

  deleteEmployee() {
    this.authServ.deleteEmployee(this.SecurityServ.matricule_security).subscribe((res) => {
      this.showSuccess(res.toString())
      this.closeModal()
    })
    setTimeout(() => {
      this.route.navigate(['/admin/employee-list']);
    }, 1000);
  }

  CheckDailyPointage(item: any) {
    this.authServ.dateDailyPointage = item.date;
    this.authServ.employee_name = item.employee_name;
    this.route.navigate(['admin/unique-pointage']);
  }

  goBack() {
    this.location.back();
  }
  //Les messages
  showSuccess(msg: string) {
    this.toast.success({
      detail: 'SUCCESS',
      summary: msg,
      duration: 3000,
    });
  }

  showError(msg: string) {
    this.toast.error({
      detail: 'ERROR',
      summary: msg,
      duration: 3000,
    });
  }

  showInfo(msg: string) {
    this.toast.info({
      detail: 'ATTENTION',
      summary: msg,
      duration: 3000,
    });
  }

  showWarn() {
    this.toast.warning({
      detail: 'ANNULER',
      summary: 'Ajout annulé',
      duration: 3000,
    });
  }
}
