import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-security-profile',
  templateUrl: './security-profile.component.html',
  styleUrls: ['./security-profile.component.css'],
  providers: [DatePipe],
})
export class SecurityProfileComponent implements OnInit {
  pointage_register: any;
  matricule_security = 5;
  security_name = '';
  last_pointage: any;
  last_pointage_lieu = '';
  last_pointage_date = '';
  pointages: any = [];

  myChartPointage: any;

  trie_lieu = false;
  lieu_croissant = false;
  trie_date = false;
  date_croissant = false;

  //pour le chart.js
  today: any;
  date: any;
  dateTab: any = [];

  photoName = "Tojo.png"

  constructor(
    private SecurityServ: SecurityAgentService,
    private authServ: AuthService,
    private route: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.SecurityServ.security_name == "") 
      this.route.navigate(['/admin/security-agent'])

    this.last_pointage_lieu = this.SecurityServ.pointed_at;
    this.refreshPointageRegisterList();

    if (this.SecurityServ.matricule_security != 0)
      this.matricule_security = this.SecurityServ.matricule_security;
    this.security_name = this.SecurityServ.security_name;
    this.photoName = this.SecurityServ.photoName;
    this.last_pointage_date = "actif"
    setTimeout(() => {
      this.getLastPointageBySec(this.matricule_security);
    }, 500);
        
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
        this.pointages.push(element);
        this.last_pointage = element;
      }
    }
    if (this.last_pointage_lieu == "not pointed")
      this.last_pointage_date = this.last_pointage.date;
    this.last_pointage_lieu = this.last_pointage.lieu;
  }

  CheckDailyPointage(item: any) {
    this.authServ.dateDailyPointage = item.date;
    this.authServ.employee_name = item.employee_name;
    this.route.navigate(['admin/unique-pointage']);
  }

  goBack() {
    this.location.back();
  }
}
