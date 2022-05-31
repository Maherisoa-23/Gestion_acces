import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';

@Component({
  selector: 'app-lieu-details',
  templateUrl: './lieu-details.component.html',
  styleUrls: ['./lieu-details.component.css'],
  providers: [DatePipe],
})
export class LieuDetailsComponent implements OnInit {
  lieu = '';
  securities: any = [];
  nb_visite: any;
  nb_pointage: any;
  nb_employee: any;
  id_lieu = 0;

  //Pour le chart.js
  today: any;
  date: any;
  dateTab: any = [];
  data: any = [];
  myChartPointage: any;

  constructor(
    private elementRef: ElementRef,
    private authServ: AuthService,
    private datePipe: DatePipe,
    private route: Router,
    private SecurityServ : SecurityAgentService
  ) {}

  ngOnInit(): void {
    this.id_lieu = this.getLieuId(this.lieu);

    this.lieu = this.authServ.lieu;
    this.getActifSecurity();
    this.getLastSevenDay();
    this.getPointageByLieuDate(this.lieu);
    this.refreshCounting();
    setTimeout(() => {
      this.chartit();
    }, 1000);
  }
  getLieuId(lieu: string) {
    if (lieu == 'Ambohijatovo') return 1;
    else {
      if (lieu == 'Andraharo') return 2;
      else return 3;
    }
  }
  refreshCounting() {
    const l = this.lieu;
    this.authServ
      .getVisitCountingFilterByPlace(this.id_lieu)
      .subscribe((data) => {
        this.nb_visite = data;
      });
    this.authServ
      .getPointageCountingFilterByPlace(this.id_lieu)
      .subscribe((data) => {
        this.nb_pointage = data;
      });
    this.authServ.getLieu(this.id_lieu).subscribe((data) => {
      this.nb_employee = data.total_employee;
    });
  }

  getActifSecurity() {
    const val = { lieu: this.lieu };
    this.authServ.getActifSecurityByLieu(val).subscribe((data) => {
      this.securities = data;
    });
  }

  getPointageByLieuDate(lieu: string) {
    const val = {
      lieu: lieu,
      date0: this.dateTab[0],
      date1: this.dateTab[1],
      date2: this.dateTab[2],
      date3: this.dateTab[3],
      date4: this.dateTab[4],
      date5: this.dateTab[5],
      date6: this.dateTab[6],
    };
    this.authServ.getAllPointageByLieuAndDate(val).subscribe((data) => {
      this.data = data;
    });
  }

  chartit() {
    const data_pointage = {
      labels: this.dateTab,
      datasets: [
        {
          label: this.lieu,
          data: this.data,
          backgroundColor: '#ca212680',
          maxBarThickness: 12,
        },
      ],
    };
    let htmlRefPointage =
      this.elementRef.nativeElement.querySelector(`#myChartPointage`);
    this.myChartPointage = new Chart(htmlRefPointage, {
      type: 'bar',
      data: data_pointage,
    });
  }

  getLastSevenDay() {
    this.today = new Date();
    for (let index = 1; index < 8; index++) {
      this.date = new Date(this.today.setDate(this.today.getDate() - 1));
      this.dateTab.push(
        this.datePipe.transform(this.date, 'yyyy-MM-dd')?.toString()
      );
    }
  }
  showAccueil() {
    this.route.navigate(['admin/']);
  }

  ShowSecurityProfile(security: any) {
    this.authServ.refreshPointageList();
    setTimeout(() => {
      this.SecurityServ.matricule_security = security.numero_matricule;
      this.SecurityServ.security_name = security.employee_name;
      this.SecurityServ.pointed_at = security.lieu;
      this.route.navigate(['admin/security-profile']);
    }, 500);
  }
}
