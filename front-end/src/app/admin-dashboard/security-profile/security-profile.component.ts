import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';

@Component({
  selector: 'app-security-profile',
  templateUrl: './security-profile.component.html',
  styleUrls: ['./security-profile.component.css'],
  providers: [DatePipe],
})
export class SecurityProfileComponent implements OnInit {
  pointage_register: any;
  matricule_security = 5;
  security_name = 'Toky';
  last_pointage: any;
  last_pointage_lieu = '';
  last_pointage_date = '';
  pointages: any = [];

  myChartPointage: any;

  trie_lieu = false;
  lieu_croissant = false;
  trie_date = false;
  date_croissant = false;

  //pour le chart.js
  today: any;
  date: any;
  dateTab: any = [];

  constructor(
    private elementRef: ElementRef,
    private SecurityServ: SecurityAgentService,
    private authServ: AuthService,
    private route: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.last_pointage_lieu = this.SecurityServ.pointed_at;
    this.refreshPointageRegisterList();
    if (this.SecurityServ.matricule_security != 0)
      this.matricule_security = this.SecurityServ.matricule_security;
    this.security_name = this.SecurityServ.security_name;
    setTimeout(() => {
      this.getLastPointageBySec(this.matricule_security);
    }, 500);
    this.getLastSevenDay();
    this.chartit();
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointage_register = data;
    });
  }

  getLastPointageBySec(matricule: number) {
    for (let index = 0; index < this.pointage_register.length; index++) {
      const element = this.pointage_register[index];
      if (element.numero_matricule == matricule) {
        this.pointages.push(element);
        this.last_pointage = element;
      }
    }
    this.last_pointage_date = this.last_pointage.date;
    if (this.last_pointage_lieu == 'not pointed') {
      this.last_pointage_lieu = this.last_pointage.lieu;
    }
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

  chartit() {
    const labels = this.dateTab;
    const data_pointage = {
      labels: labels,
      datasets: [
        {
          label: 'Activité',
          data: [
            [7.15, 15.3],
            [8.12, 16.5],
            [7.45, 15.6],
            [10.5, 13.35],
            [9.25, 16.25],
            [7.55, 15.3],
            [8.3, 15.3],
          ],
          backgroundColor: '#ca212680',
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

  CheckDailyPointage(item: any) {
    this.authServ.dateDailyPointage = item.date;
    this.authServ.employee_name = item.employee_name;
    this.route.navigate(['admin/unique-pointage']);
  }
}
