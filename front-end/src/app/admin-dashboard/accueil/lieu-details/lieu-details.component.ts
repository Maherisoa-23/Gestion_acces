import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { VisitService } from 'src/app/services/visit.service';
declare var $: any;


@Component({
  selector: 'app-lieu-details',
  templateUrl: './lieu-details.component.html',
  styleUrls: ['./lieu-details.component.css'],
  providers: [DatePipe],
})
export class LieuDetailsComponent implements OnInit {
  lieu = '';
  securities: any = [];
  nb_visite: any;
  nb_pointage: any;
  nb_employee: any;
  id_lieu = 0;
  tabSecurity: any = [];

  pointages : any = []
  visits : any = []

  isShow = false
  dtOptions: DataTables.Settings = {};
  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  constructor(
    private authServ: AuthService,
    private datePipe: DatePipe,
    private route: Router,
    private SecurityServ: SecurityAgentService,
    private visitServ : VisitService
  ) {}

  ngOnInit(): void {
    this.refreshVisitsList();
    this.refreshPointageList();
    this.id_lieu = this.getLieuId(this.lieu);

    this.lieu = this.authServ.lieu;
    this.refreshSecurityList();
    this.getActifSecurity();
    this.refreshCounting();
    setTimeout(() => {
      this.isShow =true
      this.setUpDatePicker()
    }, 700);
  }

  refreshPointageList() {
    let tmp : any = []
    this.authServ.getPointageList().subscribe((data) => {
      tmp = data;
    });
    setTimeout(() => {
      for (let index = 0; index < tmp.length; index++) {
        const element = tmp[index];
        if (element.lieu == this.lieu) 
          this.pointages.push(element)
      }
    }, 500);
  }

  refreshVisitsList() {
    let tmp : any = []
    this.visitServ.getVisitsList().subscribe((data) => {
      tmp = data;
    });
    setTimeout(() => {
      for (let index = 0; index < tmp.length; index++) {
        const element = tmp[index];
        if (element.lieu == this.lieu)
          this.visits.push(element)
      }
    }, 500);
  }

  getLieuId(lieu: string) {
    if (lieu == 'Ambohijatovo') return 1;
    else {
      if (lieu == 'Andraharo') return 2;
      else return 3;
    }
  }
  refreshCounting() {
    const l = this.lieu;
    this.authServ
      .getVisitCountingFilterByPlace(this.id_lieu)
      .subscribe((data) => {
        this.nb_visite = data;
      });
    this.authServ
      .getPointageCountingFilterByPlace(this.id_lieu)
      .subscribe((data) => {
        this.nb_pointage = data;
      });
    this.authServ.getLieu(this.id_lieu).subscribe((data) => {
      this.nb_employee = data.total_employee;
    });
  }

  getActifSecurity() {
    const val = { lieu: this.lieu };
    this.authServ.getActifSecurityByLieu(val).subscribe((data) => {
      this.securities = data;
    });
  }

  refreshSecurityList() {
    let tmp: any;
    this.authServ.getEmployeeList().subscribe((data) => {
      tmp = data;
    });
    setTimeout(() => {
      for (let index = 0; index < tmp.length; index++) {
        const element = tmp[index];
        if (element.function == 'AGENT DE SECURITE') {
          this.tabSecurity.push(element);
        }
      }
    }, 500);
  }

  getSecurity(name: string) {
    for (let index = 0; index < this.tabSecurity.length; index++) {
      const element = this.tabSecurity[index];
      if (element.employee_name == name) return element;
    }
    return null;
  }

  setUpDatePicker() {
      this.isShow = true;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5, 10, 15],
        processing: true,
        language: {url:"http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"}
      };


    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(4).search(v).draw();
    });
  }

  getPhotoPath(employee_name :string){
    return this.authServ.PhotoUrl + this.getSecurity(employee_name).photoName
  }
  showAccueil() {
    this.route.navigate(['admin/']);
  }

  ShowEmployeeProfile(emp: any) {
    this.authServ.refreshPointageList();
    const security = this.getSecurity(emp.employee_name);
    setTimeout(() => {
      this.SecurityServ.matricule_security = security.numero_matricule;
      this.SecurityServ.security_name = security.employee_name;
      this.SecurityServ.pointed_at = security.pointed_at;
      this.SecurityServ.photoName = security.photoName;
      this.SecurityServ.fonction = security.function;
      this.SecurityServ.direction = security.department_name;
      this.route.navigate(['admin/employee-profile']);
    }, 500);
  }
}
