import { Component, Input, OnInit, OnDestroy , ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataTableDirective } from 'angular-datatables' ;
declare var $: any;

@Component({
  selector: 'app-pointage-register',
  templateUrl: './pointage-register.component.html',
  styleUrls: ['./pointage-register.component.css'],
})
export class PointageRegisterComponent implements OnInit {
  dep_croissant = false;
  trie_dep = false;
  entry_time_croissant = false;
  trie_entry_time = false;
  exit_time_croissant = false;
  trie_exit_time = false;
  date_croissant = false;
  trie_date = false;
  nom_croissant = false;
  trie_nom = false;
  trie_lieu = false;
  lieu_croissant = false;

  pointages: any;
  departments: any;
  DateSelected: any;

  dtOptions: DataTables.Settings = {};
  isShow = false
  table : any;

  //filtrage personnalisé
  @ViewChild ( DataTableDirective , { static : false }) 
  datatableElement : any = DataTableDirective ;  

  depSelected : any;
  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    this.refreshDepList();
    //datepicker
    setTimeout(() => {
      this.isShow = true
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 10, 25],
        processing: true,
      };
    },500)
    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(1).search(v).draw();
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


  // ChangeDate(DateSelected: Date) {
  //   if(DateSelected == item.date){

  //   }
  // }
}
