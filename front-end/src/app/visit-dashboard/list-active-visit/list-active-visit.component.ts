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
  @Input() CIN = 0;

  constructor(
    private service: VisitService,
    private authServ: AuthService,
    private datePipe: DatePipe,
    private toast: NgToastService
  ) {}

  visitsList: any = [];
  lieu = '';
  FilteredList: any = [];

  ngOnInit(): void {
    setTimeout(() => {
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}');
      this.lieu = Lieu.lieu_name;
    }, 1000);
    this.refreshVisitsList();
  }
  showSuccess() {
    this.toast.success({
      detail: 'SUCCESS',
      summary: 'Your Success Message',
      duration: 5000,
    });
  }

  showError() {
    this.toast.error({
      detail: 'ERROR',
      summary: 'Your Error Message',
      duration: 5000,
    });
  }

  showInfo() {
    this.toast.info({
      detail: 'ATTENTION',
      summary: 'Verifier bien le nom, le numero CIN',
      duration: 6000,
    });
  }

  showWarn() {
    this.toast.warning({
      detail: 'ANNULER',
      summary: 'Ajout annulé',
      duration: 5000,
    });
  }
  refreshVisitsList() {
    this.service.getVisitsList().subscribe((data) => {
      this.visitsList = data;
    });
  }

  ActivatedAddVisit: boolean = false;
  visite: any;
  date: any;
  Date: any;
  entry_time: any;

  addVisit() {
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
    this.visitsList.push(val);

    this.service.addVisit(val).subscribe((res) => {
      if (res.toString() == 'Added successfully') {
        this.toast.success({
          detail: 'SUCCES',
          summary: 'Ajout réussi',
          duration: 5000,
        });
      } else {
        this.toast.error({
          detail: 'ERREUR',
          summary: 'Ajout impossible',
          duration: 5000,
        });
      }
      // console.log(res.toString() + ' to visit active list');
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
      this.service.deleteVisit(item.CIN).subscribe((data) => {});
      this.service.addVisitsRegister(val).subscribe((data) => {
        if (data.toString() == 'Added successfully to visit register') {
          this.toast.success({
            detail: 'SUCCES',
            summary: 'Sortie Visiteur',
            duration: 5000,
          });
        }
        // console.log(data.toString() + ' to the visit register ');
      });
    }
    this.visitsList.splice(this.visitsList.indexOf(item))
  }
}