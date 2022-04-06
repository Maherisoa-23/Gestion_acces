import { Component, Input, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css'],
})
export class AddVisitComponent implements OnInit {
  @Input() visitor_first_name = '';
  @Input() visitor_last_name = '';
  @Input() motif = '';
  @Input() CIN = 0;

  constructor(private service: VisitService) {}

  ngOnInit(): void {}

  addVisit() {
    var val = {
      visitor_first_name: this.visitor_first_name,
      visitor_last_name: this.visitor_last_name,
      motif: this.motif,
      CIN: this.CIN,
    };

    this.service.addVisit(val).subscribe((res) => {
      alert(res.toString());
    });
  }
}
