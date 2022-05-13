import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  activeConnections: any;
  pointages: any;
  activeSecurityList: any;
  myChart: any;
  admin: any;

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

  constructor(private authServ: AuthService) {
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

  refresh() {
    this.refreshActiveConnectionsList();
    this.refreshPointageList();
    this.authServ.getPointageByDep(3).subscribe((data) => {
      this.activeSecurityList = data
    });
  }



}
