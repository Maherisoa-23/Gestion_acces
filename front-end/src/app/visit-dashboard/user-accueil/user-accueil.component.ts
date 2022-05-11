import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-accueil',
  templateUrl: './user-accueil.component.html',
  styleUrls: ['./user-accueil.component.css'],
})
export class UserAccueilComponent implements OnInit {
  Date: Date = new Date();
  monOngletScriptElemeet!: HTMLScriptElement;
  constructor() {
    this.monOngletScriptElemeet = document.createElement('script');

    this.monOngletScriptElemeet.src = 'assets/javascript/clock.js';
    this.monOngletScriptElemeet.type = 'text/javascript';
    document.body.appendChild(this.monOngletScriptElemeet);
  }

  ngOnInit(): void {}
}
