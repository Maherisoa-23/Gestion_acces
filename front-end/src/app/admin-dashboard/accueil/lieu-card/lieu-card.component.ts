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
  nb_employee : any
  myChart: any;


  constructor(private elementRef: ElementRef, private authServ: AuthService) { }

  ngOnInit(): void {
    this.refreshCounting();

    setTimeout(() => {
      this.chartit()}, 500); 
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
    this.authServ.getTotalNumberOfEmployeeByPlace(this.getLieuId(this.lieu)).subscribe((data) => {
      this.nb_employee = data;
    });
  }

  chartit() {
    const data = {
      labels: [
        'pourcentage des employés',
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.nb_pointage, this.nb_employee - this.nb_pointage],
        backgroundColor: [
          '#42992ea6',
          '#e47f8b',
        ],
        borderColor: [
          '#41a629',
          '#d74051',
        ],
        hoverOffset: 4
      }]
    };
    let htmlRef = this.elementRef.nativeElement.querySelector(`#lieu-chart`);
    this.myChart = new Chart(htmlRef, {
      type: 'doughnut',
      data: data,
      options: {
        animation: {
          animateScale : true
        }
      }
    });
  }
}
