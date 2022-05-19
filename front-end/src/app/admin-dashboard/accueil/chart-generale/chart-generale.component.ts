import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chart-generale',
  templateUrl: './chart-generale.component.html',
  styleUrls: ['./chart-generale.component.css'],
  providers: [DatePipe],
})
export class ChartGeneraleComponent implements OnInit {
  @Input() tab_visit_counting: any = [];

  myChartVisite: any;
  myChartPointage: any;
  today: any
  date: any
  dateTab: any = []
  tab_pointage: any = []
  tmp: any

  constructor(private elementRef: ElementRef, private authServ: AuthService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getLastSevenDay();
    this.getPointageByLieuDate("Ambohijatovo");
    setTimeout(() => {
      this.getPointageByLieuDate("Andraharo");
    }, 500);
    setTimeout(() => {
      this.getPointageByLieuDate("Mangasoavina");
    }, 1000);
    this.refreshCounting();
    setTimeout(() => {
      this.chartit();
    }, 1000);
  }

  refreshCounting() {
    this.authServ.getTabVisitCounting().subscribe((data) => {
      this.tab_visit_counting = data;
    });
  }

  getLastSevenDay() {
    this.today = new Date()
    for (let index = 1; index < 8; index++) {
      this.date = new Date(this.today.setDate(this.today.getDate() - 1));
      this.dateTab.push(this.datePipe.transform(this.date, 'yyyy-MM-dd')?.toString())
    }
  }

  getPointageByLieuDate(lieu : string) {
    const val = {
      lieu: lieu,
      date0: this.dateTab[0],
      date1: this.dateTab[1],
      date2: this.dateTab[2],
      date3: this.dateTab[3],
      date4: this.dateTab[4],
      date5: this.dateTab[5],
      date6: this.dateTab[6],
    }
    this.authServ.getAllPointageByLieuAndDate(val).subscribe((data) => {
      this.tmp = data
    });
    setTimeout(() => {
      console.log(this.tmp)
    }, 500)
  }

  chartit() {
    const data_pointage = {
      labels: [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
      ],
      datasets: [
        {
          label: 'Ambohijatovo',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: '#ca212680',
          maxBarThickness: 12,
        },
        {
          label: 'Andraharo',
          data: [15, 32, 75, 94, 40, 66, 35],
          backgroundColor: '#37a94a80',
          maxBarThickness: 12,
        },
        {
          label: 'Mangasoavina',
          data: [48, 34, 16, 74, 53, 26, 68],
          backgroundColor: '#1e546b80',
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

}
