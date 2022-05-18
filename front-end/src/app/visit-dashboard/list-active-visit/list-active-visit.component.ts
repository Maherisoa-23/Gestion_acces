import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-list-active-visit',
  templateUrl: './list-active-visit.component.html',
  styleUrls: ['./list-active-visit.component.css'],
  providers: [DatePipe]
})
export class ListActiveVisitComponent implements OnInit {
  @Input() visit_id = 1;
  @Input() visitor_name = '';
  @Input() motif = '';
  @Input() CIN = 0;

  constructor(private service: VisitService, private authServ : AuthService, private datePipe: DatePipe) {}

  visitsList: any = [];
  lieu = ""
  FilteredList : any= [];

  ngOnInit(): void {
    setTimeout(() => {
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}')
      this.lieu = Lieu.lieu_name
    }, 1000);
    this.refreshVisitsList();
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
  entry_time : any;

  addVisit() {
    this.Date = new Date();
    this.date = this.datePipe.transform(this.Date, 'MM-dd-yyyy');
    this.entry_time = this.datePipe.transform(this.Date, ' h:mm:ss');
    var val = {
      visitor_name: this.visitor_name,
      motif: this.motif,
      CIN: this.CIN,
      lieu: this.lieu,
      date: this.date.toString(),
      entry_time : this.entry_time.toString()
    };
    
    this.service.addVisit(val).subscribe((res) => {
      console.log(res.toString() + " to visit active list");
    });
    this.refreshVisitsList();
    this.refreshVisitsList();
    this.visitor_name =""
    this.CIN = 0
    this.motif = ""
  }

  exit(item : any) {
    
    this.Date = new Date();
    this.date = this.datePipe.transform(this.Date, 'h:mm:ss');
    var val = {
      visitor_name: item.visitor_name,
      motif: item.motif,
      CIN: item.CIN,
      lieu: this.lieu,
      date: item.date,
      entry_time : item.entry_time,
      exit_time : this.date.toString()
    };
    if (confirm('Vous êtes sûs?')) {
      this.service.deleteVisit(item.visit_id).subscribe((data) => {
        
      });
      this.service.addVisitsRegister(val).subscribe((data) => {
        console.log((data.toString()) + " to the visit register ") ;
      });
    }
    setTimeout(() => {
      this.refreshVisitsList();
    }, 500);
  }
  
}
