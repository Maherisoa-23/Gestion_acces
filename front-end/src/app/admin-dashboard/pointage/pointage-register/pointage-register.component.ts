import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-pointage-register',
  templateUrl: './pointage-register.component.html',
  styleUrls: ['./pointage-register.component.css'],
})
export class PointageRegisterComponent implements OnInit {
  pointages: any;
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
    this.refreshDepList();
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
        language: {url:"http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"}
      };
    }, 600);

    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(0).search(v).draw();
    });
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refreshDepList() {
    this.authServ.getDepartmentList().subscribe((data) => {
      this.departments = data;
    });
  }

  CheckDailyPointage(item: any) {
    this.authServ.dateDailyPointage = item.date;
    this.authServ.employee_name = item.employee_name;
    this.route.navigate(['admin/unique-pointage']);
  }
}
