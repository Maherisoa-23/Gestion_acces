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
    console.log(document.querySelector("#myChart"))
    this.chartit()
  }
  
  drawChart() {
    this.myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
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

  chartit(){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    this.myChart = new Chart(htmlRef, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
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
