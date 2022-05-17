import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chart-generale',
  templateUrl: './chart-generale.component.html',
  styleUrls: ['./chart-generale.component.css'],
})
export class ChartGeneraleComponent implements OnInit {
  @Input() tab_visit_counting: any = [];

  myChartVisite: any;
  myChartPointage: any;

  constructor(private elementRef: ElementRef, private authServ: AuthService) {}

  ngOnInit(): void {
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
  chartit() {
    const data_visite = {
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
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#37ab4b',
        },
      ],
    };
    let htmlRefVisit =
      this.elementRef.nativeElement.querySelector(`#myChartVisite`);
    this.myChartVisite = new Chart(htmlRefVisit, {
      type: 'bar',
      data: data_visite,
    });
    let htmlRefPointage =
      this.elementRef.nativeElement.querySelector(`#myChartPointage`);
    this.myChartPointage = new Chart(htmlRefPointage, {
      type: 'line',
      data: data_pointage,
    });
  }
}
