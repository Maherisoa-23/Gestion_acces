import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: any;

  @Input() employee_name = '';
  @Input() function = '';
  @Input() direction = '';
  @Input() numero_matricule = 0;

  pointage_register: any;
  pointages: any;
  last_pointage: any;
  trie_nom = false;
  trie_matricule = false;
  nom_croissant = false;
  matricule_croissant = false;
  departments: any;
  // depTab : any = []

  photoName = 'anonymous.png';
  photoPath = '';

  dtOptions: DataTables.Settings = {};
  isShow = false;
  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  constructor(
    private authServ: AuthService,
    // private SecurityServ: SecurityAgentService,
    private route: Router,
    private SecurityServ: SecurityAgentService,
    private toast: NgToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.reinitialisationDonnee();
    this.refreshPointageRegisterList();
    this.refreshDepList();
    this.refreshEmployeeList();
    this.setUpDatePicker();
  }

  setUpDatePicker() {
    setTimeout(() => {
      this.isShow = true;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu: [10, 15, 25],
        processing: true,
        language: {
          url: 'http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
        },
      };
    }, 600);

    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(1).search(v).draw();
    });
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
        this.last_pointage = element;
        return (
          'le ' +
          this.last_pointage.date +
          ' ' +
          this.last_pointage.exit_time +
          ' à ' +
          this.last_pointage.lieu
        );
      }
    }
    return ' - ';
  }

  addEmployee() {
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
      this.authServ.addEmployee(val).subscribe((res) => {
        if (res.toString() == 'Added successfully') {
          this.reinitialisationDonnee();
          this.showSuccess('Nouvel employé ajouté avec succès');
          this.closeModal()
          this.ShowEmployeeProfile(val);
        } else this.showError('Erreur vérifier bien les informations');
      });
      setTimeout(() => {
        this.refreshEmployeeList();
      }, 500);
    }
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

  reinitialisationDonnee() {
    this.employee_name = this.direction = this.function = '';
    this.numero_matricule = 0;
    this.photoName = 'anonymous.png';
    this.photoPath = this.authServ.PhotoUrl + this.photoName;
  }

  ShowEmployeeProfile(emp: any) {
    this.authServ.refreshPointageList();
    setTimeout(() => {
      this.SecurityServ.matricule_security = emp.numero_matricule;
      this.SecurityServ.security_name = emp.employee_name;
      this.SecurityServ.pointed_at = emp.pointed_at;
      this.SecurityServ.photoName = emp.photoName;
      this.SecurityServ.fonction = emp.function;
      this.SecurityServ.direction = emp.department_name;
      this.route.navigate(['admin/employee-profile']);
    }, 500);
  }

  //Methode pour les modals
  showModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll()
    this.reinitialisationDonnee()
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
