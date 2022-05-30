import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visiteur-profile',
  templateUrl: './visiteur-profile.component.html',
  styleUrls: ['./visiteur-profile.component.css']
})
export class VisiteurProfileComponent implements OnInit {

  visitor_name = ""  
  CIN = 0
  description = ""
  lastVisit = ""
  Nbvisit = 0
  comment = ""

  constructor(private visitServ: VisitService) { }

  ngOnInit(): void {
    this.comment = this.visitServ.comment
    this.visitor_name = this.visitServ.visitor_name
    this.CIN = this.visitServ.CIN
    this.description = this.visitServ.description
    this.lastVisit = this.visitServ.lastVisit
    this.Nbvisit = this.visitServ.Nbvisit
  }

}
