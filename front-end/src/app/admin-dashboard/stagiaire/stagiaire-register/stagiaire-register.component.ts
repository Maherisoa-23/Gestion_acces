import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-stagiaire-register',
  templateUrl: './stagiaire-register.component.html',
  styleUrls: ['./stagiaire-register.component.css'],
})
export class StagiaireRegisterComponent implements OnInit {
  pointages: any;
  pointageStg: any = [];
  departments: any;
  DateSelected: any;

  dtOptions: DataTables.Settings = {};
  isShow = false;
  table: any;

  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  depSelected: any;
  constructor(private authServ: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    setTimeout(() => {
      this.setUpDatePicker();
    }, 500);
  }

  setUpDatePicker() {
    setTimeout(() => {
      this.isShow = true;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu: [10, 15, 25],
        processing: true,
        language: {url:"http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"}
      };
    }, 600);

    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(1).search(v).draw();
    });
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointages = data; 
    });
    setTimeout(() => {
      for (let index = 0; index < this.pointages.length; index++) {
        const element = this.pointages[index];
        if (element.numero_matricule == null) {
          this.pointageStg.push(element)
        } 
      }
    }, 1000);
  }


  CheckDailyPointage(item: any) {
    this.authServ.dateDailyPointage = item.date;
    this.authServ.employee_name = item.employee_name;
    this.route.navigate(['admin/unique-pointage']);
  }
}
