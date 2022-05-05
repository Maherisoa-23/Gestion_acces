import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lieu-card',
  templateUrl: './lieu-card.component.html',
  styleUrls: ['./lieu-card.component.css']
})
export class LieuCardComponent implements OnInit {
  @Input() lieu = ""
  @Input() employee_name = ""
  @Input() entry_time = ""
  nb_visite : any
  nb_pointage : any
  myChart: any;


  constructor(private elementRef: ElementRef, private authServ: AuthService) { }

  ngOnInit(): void {
    this.refreshCounting();
    this.chartit();
  }

  getLieuId(lieu: string) {
    if (lieu == "Ambohijatovo") return 1
    else {
      if (lieu == "Andraharo") return 2
      else return 3
    }
  }

  refreshCounting() {
    const l = this.lieu
    this.authServ.getVisitCountingFilterByPlace(this.getLieuId(this.lieu)).subscribe((data) => {
      this.nb_visite = data;
    });
    this.authServ.getPointageCountingFilterByPlace(this.getLieuId(this.lieu)).subscribe((data) => {
      this.nb_pointage = data;
    });
  }

  chartit() {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
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
    };
    let htmlRef = this.elementRef.nativeElement.querySelector(`#lieu-chart`);
    this.myChart = new Chart(htmlRef, {
      type: 'doughnut',
      data: data,
    });
  }
}
