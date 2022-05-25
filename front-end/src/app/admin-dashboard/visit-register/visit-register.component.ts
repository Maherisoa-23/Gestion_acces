import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';
declare var $: any;

@Component({
  selector: 'app-visit-register',
  templateUrl: './visit-register.component.html',
  styleUrls: ['./visit-register.component.css']
})
export class VisitRegisterComponent implements OnInit {

  visitsRegister : any;

  dtOptions: DataTables.Settings = {};
  isShow = false
  table : any;
  DateSelected: any;

  constructor(private visitServ: VisitService) { }

  ngOnInit(): void {
    this.refreshVisitRegisterList();
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

  refreshVisitRegisterList() {
    this.visitServ.getVisitsRegister().subscribe((data) => {
      this.visitsRegister = data;
    });
  }

}
