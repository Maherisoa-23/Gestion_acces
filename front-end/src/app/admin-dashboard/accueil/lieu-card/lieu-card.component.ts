import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lieu-card',
  templateUrl: './lieu-card.component.html',
  styleUrls: ['./lieu-card.component.css'],
})
export class LieuCardComponent implements OnInit {
  @Input() lieu = '';
  @Input() employee_name = '';
  @Input() entry_time = '';
  nb_visite: any;
  nb_pointage: any;
  nb_employee: any;
  myChart: any;
  id_lieu = 0;
  couleur = '';

  constructor(private elementRef: ElementRef, private authServ: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.id_lieu = this.getLieuId(this.lieu);
    this.setColor(this.id_lieu);
    this.refreshCounting();
    setTimeout(() => {
      this.chartit();
    }, 1700);
  }

  getLieuId(lieu: string) {
    if (lieu == 'Ambohijatovo') return 1;
    else {
      if (lieu == 'Andraharo') return 2;
      else return 3;
    }
  }
  setColor(id_lieu: number) {
    if (id_lieu == 1) this.couleur = '#c92128';
    else {
      if (id_lieu == 2) this.couleur = '#41a62a';
      else this.couleur = '#20566d';
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
    this.authServ.getLieu(this.id_lieu)
      .subscribe((data) => {
        this.nb_employee = data.total_employee;
        this.entry_time = data.entry_time;
      });
  }

  chartit() {
    const data = {
      labels: ['pourcentage des employés'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [this.nb_pointage, this.nb_employee  - this.nb_pointage],
          backgroundColor: [this.couleur, '#eeeeee'],
          hoverOffset: 4,
        },
      ],
    };
    let htmlRef = this.elementRef.nativeElement.querySelector(`#lieu-chart`);
    this.myChart = new Chart(htmlRef, {
      type: 'doughnut',
      data: data,
      options: {
        animation: {
          animateScale: true,
        },
      },
    });
  }

  showLieuDetails() {
    this.authServ.lieu = this.lieu;
    this.route.navigate(['admin/lieu-details'])
  }
}
