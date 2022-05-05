import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  activeConnections : any ;
  pointages : any;
  activeSecurityList : any;
  myChart: any;

  constructor(private authServ: AuthService, private elementRef: ElementRef) { 
  }

  

  ngOnInit(): void {
    console.log(document.querySelector(".card"))
    this.refreshActiveConnectionsList();
    this.refreshPointageList();
    this.refreshActiveSecurityList();
  }

  ngAfterContentInit() {
    this.chartit();
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

  refreshActiveConnectionsList() {
    this.authServ.getActiveConnectionList().subscribe((data) => {
      this.activeConnections = data;
    });
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refreshActiveSecurityList() {
    this.authServ.getPointageByDep(3).subscribe((data) => {
      this.activeSecurityList = data
    });
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
  
}
