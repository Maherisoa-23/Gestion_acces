import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-visit-register',
  templateUrl: './visit-register.component.html',
  styleUrls: ['./visit-register.component.css'],
})
export class VisitRegisterComponent implements OnInit {
  visitsRegister: any;

  departments: any;
  DateSelected: any;

  dtOptions: DataTables.Settings = {};
  isShow = false;
  table: any;

  //filtrage personnalis√©
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  depSelected: any;

  constructor(private visitServ: VisitService, private authServ: AuthService, private route : Router) { }

  ngOnInit(): void {
    this.refreshVisitRegisterList();
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
        language: { url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json" }
      };
    }, 600);

    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(2).search(v).draw();
    });
  }

  refreshVisitRegisterList() {
    this.visitServ.getVisitsRegister().subscribe((data) => {
      this.visitsRegister = data;
    });
  }

  checkVisitDetails(item: any) {
    this.authServ.employee_name = item.visitor_name
    this.authServ.dateDailyPointage = item.date;
    this.route.navigate(['admin/visit-details']);
  }
}
