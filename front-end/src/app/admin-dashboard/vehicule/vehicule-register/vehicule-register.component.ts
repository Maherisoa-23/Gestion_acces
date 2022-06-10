import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-vehicule-register',
  templateUrl: './vehicule-register.component.html',
  styleUrls: ['./vehicule-register.component.css'],
})
export class VehiculeRegisterComponent implements OnInit {
  vehicules: any;
  DateSelected: any;

  dtOptions: DataTables.Settings = {};
  isShow = false;
  table: any;

  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  constructor() {
    this.vehicules = [
      {
        numero_matricule: '12TaB',
        vehicule_name: 'Mazda',
        vehicule_marque: '4*4',
        direction: 'dsi',
        date_of_entry: '7h',
        date_of_exit: '7h',
      },
    ];
  }

  ngOnInit(): void {
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
}
