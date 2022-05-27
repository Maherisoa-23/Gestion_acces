import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { VisitService } from 'src/app/services/visit.service';
@Component({
  selector: 'app-stagiaire-list',
  templateUrl: './stagiaire-list.component.html',
  styleUrls: ['./stagiaire-list.component.css'],
})
export class StagiaireListComponent implements OnInit {
  stagiaires: any;

  dtOptions: DataTables.Settings = {};
  isShow = false;
  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  constructor(
    private visitServ: VisitService,
    // private SecurityServ: SecurityAgentService,
    private route: Router,
    private SecurityServ: SecurityAgentService
  ) {
    this.stagiaires = [
      {
        stagiaire_name: 'Lucas',
        stagiaire_etab: 'Lucas',
        stagiaire_datedebut: 'Lucas',
        stagiaire_datefin: 'Lucas',
        stagiaire_dir: 'Lucas',
      },
      {
        stagiaire_name: 'Lucas',
        stagiaire_etab: 'Lucas',
        stagiaire_datedebut: 'Lucas',
        stagiaire_datefin: 'Lucas',
        stagiaire_dir: 'Lucas',
      },
      {
        stagiaire_name: 'Lucas',
        stagiaire_etab: 'Lucas',
        stagiaire_datedebut: 'Lucas',
        stagiaire_datefin: 'Lucas',
        stagiaire_dir: 'Lucas',
      },
    ];
  }

  ngOnInit(): void {
    // this.refreshStagiaireList();
    setTimeout(() => {}, 500);
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

  // refreshStagiaireList() {
  //   this.visitServ.getVisitorList().subscribe((data) => {
  //     this.stagiaires = data;
  //   });
  // }

  ShowSecurityProfile(visitor: any) {
    this.visitServ.visitor_name = visitor.visitor_name;
    setTimeout(() => {
      this.visitServ;
      this.route.navigate(['admin/stagiaire-profile']);
    }, 1000);
  }
}
