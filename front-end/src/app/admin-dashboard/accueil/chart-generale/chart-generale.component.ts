import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chart-generale',
  templateUrl: './chart-generale.component.html',
  styleUrls: ['./chart-generale.component.css']
})
export class ChartGeneraleComponent implements OnInit {
  @Input() tab_visit_counting : any = [];
  @Input() tab_pointage_counting: any = [];

  myChart: any;

  constructor(private elementRef: ElementRef, private authServ : AuthService) {
  }

  ngOnInit(): void {
    this.refreshCounting()
    setTimeout(() => {
      this.chartit()}, 500);   
  }

  refreshCounting() {
    this.authServ.getTabVisitCounting().subscribe((data) => {
      this.tab_visit_counting = data;
    });
    this.authServ.getTabPointageCounting().subscribe((data) => {
      this.tab_pointage_counting = data;
    });
    
  }
  chartit() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: ['Ambohijatovo', 'Andraharo', 'Mangasoavina'],
        datasets: [{
          label: 'visites',
          data: this.tab_visit_counting,
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
          data: this.tab_pointage_counting,
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
