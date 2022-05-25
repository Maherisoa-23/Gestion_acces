import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
@Component({
  selector: 'app-visiteur',
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css'],
})
export class VisiteurComponent implements OnInit {
  employees: any;
  pointage_register: any;
  pointages: any;
  last_pointage: any;
  trie_nom = false;
  trie_matricule = false;
  nom_croissant = false;
  matricule_croissant = false;
  departments: any;

  dtOptions: DataTables.Settings = {};
  isShow = false;
  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  constructor(
    private authServ: AuthService,
    // private SecurityServ: SecurityAgentService,
    private route: Router,
    private SecurityServ: SecurityAgentService
  ) {}

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    this.refreshDepList();
    setTimeout(() => {
      this.refreshSecurityList();
    }, 500);
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
    return ' - ';
  }

  ShowSecurityProfile(security: any) {
    this.authServ.refreshPointageList();
    setTimeout(() => {
      this.SecurityServ.matricule_security = security.numero_matricule;
      this.SecurityServ.security_name = security.employee_name;
      this.SecurityServ.pointed_at = security.pointed_at;
      this.route.navigate(['admin/Visiteur-profile']);
    }, 1000);
  }
}
