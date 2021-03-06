import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unique-pointage',
  templateUrl: './unique-pointage.component.html',
  styleUrls: ['./unique-pointage.component.css'],
})
export class UniquePointageComponent implements OnInit {
  employee_name = "";
  date = '2022-05-10';
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
    this.employee_name = this.authServ.employee_name;
    this.date = this.authServ.dateDailyPointage;
    this.getDailyPointage();
    setTimeout(() => {
      this.isShow = true
    }, 700);
  }

  getDailyPointage() {
    const val = {
      employee_name: this.employee_name,
      date: this.date,
    };

    this.authServ.getPointageByLieuAndDate(val).subscribe((data) => {
      this.dailyPointages = data;
    });
  }
  showAccueil() {
    this.route.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  goBack() {
    this.location.back();
  }
}
