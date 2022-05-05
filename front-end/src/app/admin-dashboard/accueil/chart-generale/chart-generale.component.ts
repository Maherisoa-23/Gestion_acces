import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart-generale',
  templateUrl: './chart-generale.component.html',
  styleUrls: ['./chart-generale.component.css']
})
export class ChartGeneraleComponent implements OnInit {
  myChart: any;
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.chartit();
  }

  chartit() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: ['Ambohijatovo', 'Andraharo', 'Mangasoavina'],
        datasets: [{
          label: 'visites',
          data: [12, 19, 3],
          backgroundColor: [
            'rgba(201, 0, 23, 0.5)',
            'rgba(201, 0, 23, 0.5)',
            'rgba(201, 0, 23, 0.5)',
          ],
          borderColor: [
            '#c90017',
            '#c90017',
            '#c90017',
          ],
          borderWidth: 1
        },
        {
          label: 'pointage',
          data: [ 5, 7, 3],
          backgroundColor: [
            'rgba(65, 166, 41, 0.5)',
            'rgba(65, 166, 41, 0.5)',
            'rgba(65, 166, 41, 0.5)'
          ],
          borderColor: [
            '#41a629',
            '#41a629',
            '#41a629'
          ],
          borderWidth: 1
        }]

      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
