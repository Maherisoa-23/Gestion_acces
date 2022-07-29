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
  tab_visit_counting: any = [];
  tab_pointage_counting: any = [];

  myChartPointage: any;
  chartPointageActif: any;
  today: any
  date: any
  dateTab: any = []
  tmp: any

  ambohijatovo_tab: any
  andraharo_tab: any
  mangasoavina_tab: any

  constructor(private elementRef: ElementRef, private authServ: AuthService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getLastSevenDay();
    this.refreshCounting();
    setTimeout(() => {
      this.chartit();
    }, 2000);
  }

  refreshPointageLieu() {
    this.getPointageByLieuDate("Ambohijatovo");
    setTimeout(() => {
      this.getPointageByLieuDate("Andraharo");
    }, 500);
    setTimeout(() => {
      this.getPointageByLieuDate("Mangasoavina");
    }, 1000);
  }
  
  refreshCounting() {
    this.refreshPointageLieu()
    this.authServ.getTabVisitCounting().subscribe((data) => {
      this.tab_visit_counting = data;
    });
    this.authServ.getTabPointageCounting().subscribe((data) => {
      this.tab_pointage_counting = data;
    });
  }

  getLastSevenDay() {
    this.today = new Date()
    for (let index = 1; index < 8; index++) {
      this.date = new Date(this.today.setDate(this.today.getDate() - 1));
      this.dateTab.push(this.datePipe.transform(this.date, 'yyyy-MM-dd')?.toString())
    }
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
    }
    this.authServ.getAllPointageByLieuAndDate(val).subscribe((data) => {
      this.tmp = data
    });
    setTimeout(() => {
      if (lieu == "Ambohijatovo") {
        this.ambohijatovo_tab = this.tmp
      } else if (lieu == "Andraharo") this.andraharo_tab = this.tmp
      else this.mangasoavina_tab = this.tmp
    }, 500)
  }

  chartit() {
    //pointage actif chart pie
    const data_pointage = {
      labels: ['Ambohijatovo', 'Andraharo', 'Mangasoavina'],
      datasets: [
        {
          label: 'Dataset 1',
          data: this.tab_pointage_counting,
          backgroundColor: ["#ca212680","#41a62aad","#1e546b80"],
        }
      ]
    };
    let htmlRefPointage = this.elementRef.nativeElement.querySelector(`#myChartPointage`);
    this.chartPointageActif = new Chart (htmlRefPointage, {
      type: 'pie',
      data: data_pointage,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart'
          }
        }
      },
    })
    //Registre pointages des 7 dernières jours
    const data_pointage_register = {
      labels: this.dateTab,
      datasets: [
        {
          label: '',
          data: [0,0,0,0,0,0,0],
          backgroundColor: '#ffffff',
          maxBarThickness: 0,
        },
        {
          label: 'Ambohijatovo',
          data: this.ambohijatovo_tab,
          backgroundColor: '#ca212680',
          maxBarThickness: 14,
        },
        {
          label: 'Andraharo',
          data: this.andraharo_tab,
          backgroundColor: '#41a62aad',
          maxBarThickness: 14,
        },
        {
          label: 'Mangasoavina',
          data: this.mangasoavina_tab,
          backgroundColor: '#1e546b80',
          maxBarThickness: 14,
        },
      ],
    };
    let htmlRefPointageRegister =
      this.elementRef.nativeElement.querySelector(`#myChartPointageRegister`);
    this.myChartPointage = new Chart(htmlRefPointageRegister, {
      type: 'bar',
      data: data_pointage_register,
    });
  }

}
