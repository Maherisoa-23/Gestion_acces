import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { VisitService } from 'src/app/services/visit.service';
@Component({
  selector: 'app-visiteur',
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css'],
})
export class VisiteurComponent implements OnInit {
  visitors: any = [];

  visits : any = [];

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
  ) {}

  ngOnInit(): void {
    this.refreshVisitRegisterList();
    setTimeout(() => {
      this.refreshVisitorList();
    }, 500);
    this.setUpDatePicker();
  }

  refreshVisitRegisterList() {
    this.visitServ.getVisitsRegister().subscribe((data) => {
      this.visits = data;
    });
  }

  refreshVisitorList() {
    this.visitServ.getVisitorList().subscribe((data) => {
      this.visitors = data;
    });
  }

  ShowSecurityProfile(visitor: any) {
    this.visitServ.comment = visitor.comment
    this.visitServ.lastVisit = this.getLastVisite(visitor.visitor_name)
    this.visitServ.visitor_name = visitor.visitor_name
    this.visitServ.CIN = visitor.CIN
    this.visitServ.description = visitor.description
    this.visitServ.Nbvisit = this.countNbVisit(visitor.visitor_name)
    setTimeout(() => {
      this.visitServ
      this.route.navigate(['admin/visiteur-profile']);
    }, 1000);
  }

  countNbVisit(visitor_name : string) {
    let cpt = 0;
    for (let index = 0; index < this.visits.length; index++) {
      const element = this.visits[index];
      if (element.visitor_name == visitor_name) {
        cpt++
      }
    }
    return cpt;
  }

  getLastVisite(visitor : string) {
    let lastVisit;
    for (let index = 0; index < this.visits.length; index++) {
      const element = this.visits[index];
      if (element.visitor_name == visitor) {
        lastVisit = element.lieu + ", le " + element.date
      }
    }
    return lastVisit
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
}
