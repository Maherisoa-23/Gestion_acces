import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-unique-pointage',
  templateUrl: './unique-pointage.component.html',
  styleUrls: ['./unique-pointage.component.css'],
})
export class UniquePointageComponent implements OnInit {
  employee_name = "";
  date = '2022-05-10';
  dailyPointages: any;
  constructor(
    private authServ: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employee_name = this.authServ.employee_name;
    this.date = this.authServ.dateDailyPointage;
    console.log("name : " + this.employee_name + +" date : " + this.date)
    this.getDailyPointage();
  }

  getDailyPointage() {
    const val = {
      employee_name: this.employee_name,
      date: this.date,
    };

    this.authServ.getPointageByLieuAndDate(val).subscribe((data) => {
      this.dailyPointages = data;
    });
    setTimeout(() => {
      console.log(this.dailyPointages)
    }, 1000);
  }
  showAccueil() {
    this.route.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
