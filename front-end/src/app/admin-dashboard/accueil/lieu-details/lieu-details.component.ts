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
  tabSecurity: any = [];

  //Pour le chart.js
  today: any;
  date: any;
  dateTab: any = [];
  data: any = [];
  myChartPointage: any;
  photoPath = '';
  photoName = 'anonymous.png';

  constructor(
    private elementRef: ElementRef,
    private authServ: AuthService,
    private datePipe: DatePipe,
    private route: Router,
    private SecurityServ: SecurityAgentService
  ) {}

  ngOnInit(): void {
    this.id_lieu = this.getLieuId(this.lieu);

    this.lieu = this.authServ.lieu;
    this.refreshSecurityList();
    this.getActifSecurity();
    this.getLastSevenDay();
    this.getPointageByLieuDate(this.lieu);
    this.refreshCounting();
    setTimeout(() => {
      this.chartit();
    }, 1000);
    this.photoPath = this.authServ.PhotoUrl + this.photoName;
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
    this.dateTab.unshift('date : ');
    const data_pointage = {
      labels: this.dateTab,
      datasets: [
        {
          label: 'pointage ' + this.lieu,
          //data: this.data, version finale mais pour démonstration sans donnéeon va initialiser d'abord les données
          data: [0, 71, 84, 62, 57, 73, 77, 68],
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

  refreshSecurityList() {
    let tmp: any;
    this.authServ.getEmployeeList().subscribe((data) => {
      tmp = data;
    });
    setTimeout(() => {
      for (let index = 0; index < tmp.length; index++) {
        const element = tmp[index];
        if (element.function == 'AGENT DE SECURITE') {
          this.tabSecurity.push(element);
        }
      }
    }, 500);
  }

  getSecurity(name: string) {
    for (let index = 0; index < this.tabSecurity.length; index++) {
      const element = this.tabSecurity[index];
      if (element.employee_name == name) return element;
    }
    return null;
  }

  getPhotoPath(employee_name :string){
    return this.authServ.PhotoUrl + this.getSecurity(employee_name).photoName
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

  ShowEmployeeProfile(emp: any) {
    this.authServ.refreshPointageList();
    const security = this.getSecurity(emp.employee_name);
    setTimeout(() => {
      this.SecurityServ.matricule_security = security.numero_matricule;
      this.SecurityServ.security_name = security.employee_name;
      this.SecurityServ.pointed_at = security.pointed_at;
      this.SecurityServ.photoName = security.photoName;
      this.SecurityServ.fonction = security.function;
      this.SecurityServ.direction = security.department_name;
      this.route.navigate(['admin/employee-profile']);
    }, 500);
  }
}
