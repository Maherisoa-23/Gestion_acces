import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';

@Component({
  selector: 'app-security-profile',
  templateUrl: './security-profile.component.html',
  styleUrls: ['./security-profile.component.css']
})
export class SecurityProfileComponent implements OnInit {

  pointage_register: any;
  matricule_security: any;
  security_name = "Toky";
  last_pointage: any;
  last_pointage_lieu = "";
  last_pointage_date = "";
  pointages :any = [];

  myChartPointage: any;

  trie_lieu = false;
  lieu_croissant = false;
  trie_date = false;
  date_croissant = false;

  constructor(private elementRef: ElementRef,private SecurityServ: SecurityAgentService, private authServ: AuthService) { }

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    this.matricule_security = this.SecurityServ.matricule_security;
    this.security_name = this.SecurityServ.security_name;
    setTimeout(() => {
      this.getLastPointageBySec(this.matricule_security);
    }, 500)
    this.chartit();
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointage_register = data;
    });
  }

  getLastPointageBySec(matricule: number) {
    for (let index = 0; index < this.pointage_register.length; index++) {
      const element = this.pointage_register[index];
      if (element.numero_matricule == matricule) {
        this.pointages.push(element)
        this.last_pointage = element
      }
    }
    this.last_pointage_date = this.last_pointage.date;
    this.last_pointage_lieu = this.last_pointage.lieu;
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

  SortByLieu(){
    this.trie_lieu = true
    this.trie_date =  false
    if (!this.lieu_croissant) {
      this.pointages.sort((a : any,b : any) => a.lieu.localeCompare(b.lieu));
      this.lieu_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.lieu.localeCompare(b.lieu));
      this.lieu_croissant = false
    }
  }

  SortByDate(){
    this.trie_date = true
    this.trie_lieu = false
    if (!this.date_croissant) {
      this.pointages.sort((a : any,b : any) => a.date.localeCompare(b.date));
      this.date_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.date.localeCompare(b.date));
      this.date_croissant = false
    }
  }
}
