import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Chart } from 'chart.js';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  pointages: any;
  activeSecurityList: any = [];
  myChart: any;
  admin: any;

  lieux : any


  // Clock
  Date: Date = new Date();
  private daysArray = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  private date = new Date();
  public hour: any;
  public minute!: string;
  public second!: string;
  public ampm!: string;
  public day!: string;

  constructor(private authServ: AuthService, private SecurityServ: SecurityAgentService, private route: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('admin1') != null) {
      this.admin = JSON.parse(localStorage.getItem('admin1') || '{}');
      console.log("admin name = " + this.admin.user_name)
    }
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);
    this.day = this.daysArray[this.date.getDay()];
    this.refresh();
  }

  //Methode de l'horloge
  private updateDate(date: Date) {
    const hours = date.getHours();
    this.ampm = hours >= 12 ? 'PM' : 'AM';
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refresh() {
    const val = "";
    this.refreshLieuxList()
    this.refreshPointageList();
    /* this.authServ.getActiveUsersList(val).subscribe((data) => {
      this.activeSecurityList = data
    }); */
    setTimeout(() => {
      this.getActiveSecurity()
    }, 500);
  }

  getActiveSecurity() {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.function == "AGENT DE SECURITE") {
        this.activeSecurityList.push(element)
      }
    }
  }

  refreshLieuxList(){
    this.authServ.getLieuList().subscribe((data) => {
      this.lieux = data
    });
  }

  ShowSecurityProfile(security: any) {
    this.authServ.refreshPointageList();
    setTimeout(() => {
      this.SecurityServ.matricule_security = security.numero_matricule;
      this.SecurityServ.security_name = security.employee_name;
      this.SecurityServ.pointed_at = security.lieu;
      this.route.navigate(['admin/security-profile']);
    }, 1000);
  }


}
