import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: any;

  @Input() employee_name= "";
  @Input() fonction= "";
  @Input() direction= "";
  @Input() numero_matricule= "";

  pointage_register: any;
  pointages: any;
  last_pointage: any;
  trie_nom = false;
  trie_matricule = false;
  nom_croissant = false;
  matricule_croissant = false;
  departments: any;
  // depTab : any = []

  photoName = "anonymous.png"
  photoPath = ""

  dtOptions: DataTables.Settings = {};
  isShow = false
  //filtrage personnalisé
  @ViewChild ( DataTableDirective , { static : false }) 
  datatableElement : any = DataTableDirective ; 

  constructor(
    private authServ: AuthService,
    // private SecurityServ: SecurityAgentService,
    private route: Router,
    private SecurityServ : SecurityAgentService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    this.refreshDepList();
    setTimeout(() => {
      this.refreshSecurityList();
    }, 500);
    this.setUpDatePicker()
  }

  setUpDatePicker() {
    setTimeout(() => {
      this.isShow = true
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu : [10, 15, 25],
        processing: true,
        language: {url:"http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"}
      };
    },600)
    
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

  refreshSecurityList() {
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
    return " - "
  }
addEmployee(){}

uploadPhoto(event : any) {
  var file = event.target.files[0];
  const formData : FormData = new FormData()
  formData.append('uploadedFile',file,file.name); 

  this.authServ.UploadPhoto(formData).subscribe((data) => {
    this.photoName = data.toString();
    this.photoPath = this.authServ.PhotoUrl + this.photoName
  })
}
  ShowEmployeeProfile(security: any) {
    this.authServ.refreshPointageList();
    setTimeout(() => {
      this.SecurityServ.matricule_security = security.numero_matricule;
      this.SecurityServ.security_name = security.employee_name;
      this.SecurityServ.pointed_at = security.pointed_at;
      this.SecurityServ.photoName = security.photoName;
      this.SecurityServ.fonction = security.function;
      this.SecurityServ.direction = security.department_name;
      this.route.navigate(['admin/employee-profile']);
    }, 1000);
  }

  editEmployee(security: any){
    this.authServ.refreshPointageList();
    setTimeout(() => {
      this.employee_name= security.employee_name;
      this.fonction=security.function;
      this.direction=security.department_name;
      this.numero_matricule=security.numero_matricule;
    }, 1000);
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
