import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-accueil',
  templateUrl: './user-accueil.component.html',
  styleUrls: ['./user-accueil.component.css'],
})
export class UserAccueilComponent implements OnInit {
  Date: Date = new Date();
  // monOngletScriptElemeet!: HTMLScriptElement;
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
  constructor(private route : Router) {
  }

  ngOnInit(): void {

    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);
    this.day = this.daysArray[this.date.getDay()];

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

  showPointage() {
    this.route.navigate(['agent/pointage']);
  }
  showVisit() {
    this.route.navigate(['agent/visit-active']);
  }
}
