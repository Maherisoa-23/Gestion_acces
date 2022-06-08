import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-security-profile',
  templateUrl: './security-profile.component.html',
  styleUrls: ['./security-profile.component.css'],
  providers: [DatePipe],
})
export class SecurityProfileComponent implements OnInit {
  employees: any;
  departments: any;
  isEdit = false;
  @Input() employee_name = '';
  @Input() function = '';
  // @Input() direction = '';
  @Input() numero_matricule = 0;
  pointage_register: any;
  matricule_security = 5;
  security_name = '';
  last_pointage: any;
  last_pointage_lieu = '';
  last_pointage_date = '';
  pointages: any = [];

  myChartPointage: any;

  trie_lieu = false;
  lieu_croissant = false;
  trie_date = false;
  date_croissant = false;

  //pour le chart.js
  today: any;
  date: any;
  dateTab: any = [];

  photoName = 'Tojo.png';
  photoPath = '';
  fonction = '';
  direction = '';
  constructor(
    private SecurityServ: SecurityAgentService,
    private authServ: AuthService,
    private route: Router,
    private location: Location,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.reinitialisationDonnee();
    this.refreshPointageRegisterList();
    this.refreshDepList();
    this.refreshEmployeeList();
    if (this.SecurityServ.security_name == '')
      this.route.navigate(['/admin/security-agent']);

    this.last_pointage_lieu = this.SecurityServ.pointed_at;
    this.refreshPointageRegisterList();

    if (this.SecurityServ.matricule_security != 0)
      this.matricule_security = this.SecurityServ.matricule_security;
    this.security_name = this.SecurityServ.security_name;
    // this.direction = this.SecurityServ.direction;

    this.photoName = this.SecurityServ.photoName;
    this.last_pointage_date = 'actif';
    setTimeout(() => {
      this.getLastPointageBySec(this.matricule_security);
    }, 500);
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
    if (this.last_pointage_lieu == 'not pointed')
      this.last_pointage_date = this.last_pointage.date;
    this.last_pointage_lieu = this.last_pointage.lieu;
  }

  CheckDailyPointage(item: any) {
    this.authServ.dateDailyPointage = item.date;
    this.authServ.employee_name = item.employee_name;
    this.route.navigate(['admin/unique-pointage']);
  }

  goBack() {
    this.location.back();
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
  updateUpdate() {
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
          this.reinitialisationDonnee();
          this.showSuccess('Employée modifié avec succès');
        }
      });
      this.refreshEmployeeList();
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