import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-list-visit-admin',
  templateUrl: './list-visit-admin.component.html',
  styleUrls: ['./list-visit-admin.component.css']
})
export class ListVisitAdminComponent implements OnInit {

  monOngletScriptElemet!: HTMLScriptElement;
  constructor(private service: VisitService) {
    this.monOngletScriptElemet = document.createElement('script');

    this.monOngletScriptElemet.src = 'assets/javascript/onglet.js';
    this.monOngletScriptElemet.type = 'text/javascript';
    document.body.appendChild(this.monOngletScriptElemet);
  }

  visitsList: any = [];

  ngOnInit(): void {
    this.refreshVisitsList();
  }
  refreshVisitsList() {
    this.service.getVisitsList().subscribe((data) => {
      this.visitsList = data;
    });
  }
}
