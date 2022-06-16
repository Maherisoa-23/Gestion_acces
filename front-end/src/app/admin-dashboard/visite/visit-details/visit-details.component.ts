import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})
export class VisitDetailsComponent implements OnInit {
  visitor_name = "";
  date = '';
  dailyPointages: any;

  isShow = false
  constructor(
    private authServ: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit(): void {
    if (this.authServ.employee_name == "") this.location.back();
    this.visitor_name = this.authServ.employee_name;
    this.date = this.authServ.dateDailyPointage;
    this.getDailyVisit();
    setTimeout(() => {
      this.isShow = true
    }, 700);
  }

  getDailyVisit() {
    const val = {
      visitor_name: this.visitor_name,
      date: this.date,
    };

    this.authServ.getVisitByLieuAndDate(val).subscribe((data) => {
      this.dailyPointages = data;
    });
  }

  goBack() {
    this.location.back();
  }
}
