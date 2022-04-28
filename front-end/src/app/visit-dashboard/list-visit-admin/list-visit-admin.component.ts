import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-visit-admin',
  templateUrl: './list-visit-admin.component.html',
  styleUrls: ['./list-visit-admin.component.css']
})
export class ListVisitAdminComponent implements OnInit {

  monOngletScriptElemet!: HTMLScriptElement;
  constructor() {
    this.monOngletScriptElemet = document.createElement('script');

    this.monOngletScriptElemet.src = 'assets/javascript/onglet.js';
    this.monOngletScriptElemet.type = 'text/javascript';
    document.body.appendChild(this.monOngletScriptElemet);
  }
  ngOnInit(): void {
  }

}
