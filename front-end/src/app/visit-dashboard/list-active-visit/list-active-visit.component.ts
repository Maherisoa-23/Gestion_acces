import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VisitService } from 'src/app/services/visit.service';
import { NgToastService } from 'ng-angular-popup';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-list-active-visit',
  templateUrl: './list-active-visit.component.html',
  styleUrls: ['./list-active-visit.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter , :leave', [animate(1000)]),
    ]),
  ],
})
export class ListActiveVisitComponent implements OnInit {
  @Input() visit_id = 1;
  @Input() visitor_name = '';
  @Input() motif = '';
  @Input() CIN: any = 0;
  @Input() comment = null;
  @Input() description = null;

  constructor(
    private visitServ: VisitService,
    private datePipe: DatePipe,
    private toast: NgToastService
  ) { }

  visitsList: any = [];
  lieu = '';
  FilteredList: any = [];

  visitors: any = [];

  visite: any;
  date: any;
  Date: any;
  entry_time: any;

  haveCIN = true;

  ngOnInit(): void {
    setTimeout(() => {
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}');
      this.lieu = Lieu.lieu_name;

      //trie décroissant, ze tonga farany no eo ambony
      this.visitsList.sort((b: any, a: any) =>
        a.entry_time.localeCompare(b.entry_time)
      );
    }, 1000);
    this.refreshVisitsList();
    this.refreshVisitorList();
  }

  refreshVisitorList() {
    this.visitServ.getVisitorList().subscribe((data) => {
      this.visitors = data;
    });
  }

  refreshVisitsList() {
    this.visitServ.getVisitsList().subscribe((data) => {
      this.visitsList = data;
    });
  }

  addNewVisitor() {
    const val = {
      visitor_name: this.visitor_name,
      CIN: this.CIN,
      comment: this.comment,
      description: this.description,
    };
    this.visitServ.addVisitor(val).subscribe((res) => { });
    this.refreshVisitorList();
  }

  isNewVisitor(visitor: string) {
    for (let index = 0; index < this.visitors.length; index++) {
      const element = this.visitors[index];
      if (element.visitor_name == visitor) return false;
    }
    return true;
  }
  suggested(visitor: any) {
    if (visitor.comment == null) this.haveCIN = true;
    else this.haveCIN = false;
    this.visitor_name = visitor.visitor_name;
    this.CIN = visitor.CIN;
    this.comment = visitor.comment;
    this.description = visitor.description;
  }

  //Au cas ou le visiteur n'as pas de CIN
  NoCIN() {
    if (this.haveCIN) this.haveCIN = false;
    else this.haveCIN = true;
    this.comment = null;
    this.CIN = null;
  }
  
  addVisit() {
    if (this.isNewVisitor(this.visitor_name)) this.addNewVisitor();
    this.Date = new Date();
    this.date = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
    this.entry_time = this.datePipe.transform(this.Date, ' h:mm:ss');
    var val = {
      visitor_name: this.visitor_name,
      motif: this.motif,
      CIN: this.CIN,
      lieu: this.lieu,
      date: this.date.toString(),
      entry_time: this.entry_time.toString(),
    };


    this.visitServ.addVisit(val).subscribe((res) => {
      if (res.toString() == 'Added successfully') {
        this.showSuccess('Ajout reussi');
        //animation d'entré
        this.visitsList.unshift(val);
      } else {
        this.showError('Ajout impossible');
      }
    });

    this.visitor_name = '';
    this.CIN = 0;
    this.motif = '';
  }

  exit(item: any) {
    this.Date = new Date();
    this.date = this.datePipe.transform(this.Date, 'h:mm:ss');
    var val = {
      visitor_name: item.visitor_name,
      motif: item.motif,
      CIN: item.CIN,
      lieu: this.lieu,
      date: item.date,
      entry_time: item.entry_time,
      exit_time: this.date.toString(),
    };
    if (confirm('Vous êtes sûs?')) {
      this.visitServ.deleteVisit(item.visitor_name).subscribe((data) => { });
      this.visitServ.addVisitsRegister(val).subscribe((data) => {
        if (data.toString() == 'Added successfully to visit register') {
          this.showSuccess('Sortie du visiteur');
          //animation sortie
          this.visitsList = this.visitsList.filter((f: any) => {
            return f.CIN != item.CIN;
          });
        }
        // console.log(data.toString() + ' to the visit register ');
      });
    }
  }

  //Les messages
  showSuccess(msg: string) {
    this.toast.success({
      detail: 'SUCCESS',
      summary: msg,
      duration: 3000,
    });
  }

  showError(msg: string) {
    this.toast.error({
      detail: 'ERROR',
      summary: msg,
      duration: 3000,
    });
  }

  showInfo() {
    this.toast.info({
      detail: 'ATTENTION',
      summary: 'Verifier bien le nom, le numero CIN',
      duration: 3000,
    });
  }

  showWarn() {
    this.toast.warning({
      detail: 'ANNULER',
      summary: 'Ajout annulé',
      duration: 3000,
    });
  }
}
