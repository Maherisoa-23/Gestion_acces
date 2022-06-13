import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitService } from 'src/app/services/visit.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-visiteur-profile',
  templateUrl: './visiteur-profile.component.html',
  styleUrls: ['./visiteur-profile.component.css'],
})
export class VisiteurProfileComponent implements OnInit {
  visitor_name = '';
  CIN = 0;
  description = '';
  lastVisit = '';
  Nbvisit = 0;
  comment = '';

  constructor(
    private visitServ: VisitService,
    private route: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.visitServ.visitor_name == '')
      this.route.navigate(['/admin/visiteur-list']);
    this.comment = this.visitServ.comment;
    this.visitor_name = this.visitServ.visitor_name;
    this.CIN = this.visitServ.CIN;
    this.description = this.visitServ.description;
    this.lastVisit = this.visitServ.lastVisit;
    this.Nbvisit = this.visitServ.Nbvisit;
  }
  goBack() {
    this.location.back();
  }
}
