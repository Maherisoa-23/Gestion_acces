import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vehicule-register',
  templateUrl: './vehicule-register.component.html',
  styleUrls: ['./vehicule-register.component.css'],
})
export class VehiculeRegisterComponent implements OnInit {
  vehicules: any = [];
  DateSelected: any;
  pointages : any = []

  dtOptions: DataTables.Settings = {};
  isShow = false;
  table: any;

  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  constructor(private authServ : AuthService, private route: Router) {
  }

  ngOnInit(): void {
    this.refreshPointageVehiculeList()
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

  refreshPointageVehiculeList() {
    this.authServ.getVehiculePointage().subscribe((data) => {
      this.vehicules = data
    })
  }

  CheckDailyPointage(item: any) {
    this.authServ.dateDailyPointage = item.date;
    this.authServ.employee_name = item.employee_name;
    this.route.navigate(['admin/unique-pointage']);
  }
}
