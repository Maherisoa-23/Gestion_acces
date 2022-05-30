import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { VisitService } from 'src/app/services/visit.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stagiaire-list',
  templateUrl: './stagiaire-list.component.html',
  styleUrls: ['./stagiaire-list.component.css'],
  providers: [DatePipe]
})
export class StagiaireListComponent implements OnInit {
  stagiaires: any;
  @Input() stagiaire_name!: string;
  @Input() description!: string;
  @Input() direction: string = "DSI";
  @Input() date_debut!: Date;
  @Input() date_fin!: Date;

  dtOptions: DataTables.Settings = {};
  isShow = false;
  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  depTab : any = []

  constructor(
    private authServ: AuthService,
    private stgServ: StagiaireService,
    private securityServ : SecurityAgentService,
    private route: Router,
    private datePipe : DatePipe
  ) {}

  ngOnInit(): void {
    this.refreshDepList()
    this.refreshStagiaireList();
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

  refreshDepList() {
    this.authServ.getDepartmentList().subscribe((data) => {
      this.depTab = data
    })
  }
  getDepID(name : string){
    for (let index = 0; index < this.depTab.length; index++) {
      const element = this.depTab[index];
      if (element.department_short_name == name){
        return element.departement_id
      }
    }
  }
  addStagiaire() {
    const val = {
      stagiaire_name : this.stagiaire_name,
      description : this.description,
      start_date : this.date_debut.toString(),
      end_date : this.date_fin.toString(),
      department_name : this.direction.toString(),
    }

    this.authServ.addStagiaire(val).subscribe((res) => {
      alert(res.toString())
    })
    setTimeout(() => {
      this.refreshStagiaireList()
    }, 500);
  }
  refreshStagiaireList() {
    this.authServ.getStagiaireList().subscribe((data) => {
      this.stagiaires = data
    })
  }

  showStagiaireProfile(item : any) {
    this.stgServ.stagiaire_name = item.stagiaire_name;
    this.stgServ.departement = item.department_name;
    this.stgServ.description = item.descritpion;
    this.stgServ.start_date = item.start_date;
    this.stgServ.end_date = item.end_date;
    this.securityServ.security_name = item.stagiaire_name
    this.route.navigate(['admin/stagiaire-profile']);
  }
}
