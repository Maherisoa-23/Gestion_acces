import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  @Input() visit_id = 1
  @Input() visitor_first_name = ""
  @Input() visitor_last_name = ""
  @Input() motif = ""
  @Input() CIN = 0
  @Input() date_of_entry = ""
  constructor() { }

  ngOnInit(): void {
  }

}
