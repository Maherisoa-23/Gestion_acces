import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-list-active-visit',
  templateUrl: './list-active-visit.component.html',
  styleUrls: ['./list-active-visit.component.css'],
})
export class ListActiveVisitComponent implements OnInit {
  @Input() visit_id = 1;
  @Input() visitor_name = '';
  @Input() motif = '';
  @Input() CIN = 0;

  constructor(private service: VisitService, private authServ : AuthService) {}

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
  date = new Date();

  addVisit() {
    var val = {
      visitor_name: this.visitor_name,
      motif: this.motif,
      CIN: this.CIN,
      lieu: this.authServ.lieu,
      date_of_entry: Date.now().toString()
    };
    
    this.service.addVisit(val).subscribe((res) => {
      alert(res.toString());
    });
    this.refreshVisitsList();
    this.refreshVisitsList();
  }

  exit(item : any) {
    var val = {
      visitor_first_name: item.visitor_first_name,
      visitor_last_name: item.visitor_last_name,
      motif: item.motif,
      CIN: item.CIN,
      date_of_entry: item.date_of_entry,
      exit_time : this.date
    };
    if (confirm('Vous êtes sûs?')) {
      this.service.deleteVisit(item.visit_id).subscribe((data) => {
        alert(data.toString());
      });
      this.service.addVisitsRegister(val).subscribe((res) => {
      });
    }
    this.refreshVisitsList();
    this.refreshVisitsList();
  }
  
}
