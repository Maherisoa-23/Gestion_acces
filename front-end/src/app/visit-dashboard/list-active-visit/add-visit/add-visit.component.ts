import { Component, Input, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css'],
})
export class AddVisitComponent implements OnInit {
  @Input() visitor_name = '';
  @Input() motif = '';
  @Input() CIN = 0;
  date_of_entry : Date;


  constructor(private service: VisitService) {
    this.date_of_entry =new Date()
  }

  ngOnInit(): void {}

  addVisit() {
    var val = {
      visitor_name: this.visitor_name,
      motif: this.motif,
      CIN: this.CIN,
      date_of_entry: Date.now().toString()
    };

    this.service.addVisit(val).subscribe((res) => {
      alert(res.toString());
    });
  }
}
