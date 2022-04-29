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
    this.lieu = this.authServ.lieu
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

  addVisit() {
    this.date = new Date();
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd, h:mm:ss');
    var val = {
      visitor_name: this.visitor_name,
      motif: this.motif,
      CIN: this.CIN,
      lieu: this.authServ.lieu,
      date_of_entry: this.date.toString()
    };
    
    this.service.addVisit(val).subscribe((res) => {
      console.log(res.toString());
    });
    this.refreshVisitsList();
    this.refreshVisitsList();
    this.visitor_name =""
    this.CIN = 0
    this.motif = ""
  }

  exit(item : any) {
    
    this.date = new Date();
    this.date = this.datePipe.transform(this.date, 'h:mm:ss');
    var val = {
      visitor_name: item.visitor_name,
      motif: item.motif,
      CIN: item.CIN,
      lieu: item.lieu,
      date_of_entry: item.date_of_entry,
      exit_time : this.date.toString()
    };
    if (confirm('Vous êtes sûs?')) {
      this.service.deleteVisit(item.visit_id).subscribe((data) => {
        
      });
      this.service.addVisitsRegister(val).subscribe((data) => {
        console.log((data.toString()));
      });
    }
    this.refreshVisitsList();
    this.refreshVisitsList();
  }
  
}
