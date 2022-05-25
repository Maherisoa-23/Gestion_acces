import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visiteur-profile',
  templateUrl: './visiteur-profile.component.html',
  styleUrls: ['./visiteur-profile.component.css']
})
export class VisiteurProfileComponent implements OnInit {

  visitor_name = ""
  description = ""
  CIN = 0
  constructor(private visitServ: VisitService) { }

  ngOnInit(): void {
    this.visitor_name = this.visitServ.visitor_name;
    this.description = this.visitServ.description;
    this.CIN = this.visitServ.CIN
  }

}
