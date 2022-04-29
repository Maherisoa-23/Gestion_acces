import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-list-visit-admin',
  templateUrl: './list-visit-admin.component.html',
  styleUrls: ['./list-visit-admin.component.css']
})
export class ListVisitAdminComponent implements OnInit {

  monOngletScriptElemet!: HTMLScriptElement;
  constructor(private service: VisitService, private authServ: AuthService) {
    this.monOngletScriptElemet = document.createElement('script');

    this.monOngletScriptElemet.src = 'assets/javascript/onglet.js';
    this.monOngletScriptElemet.type = 'text/javascript';
    document.body.appendChild(this.monOngletScriptElemet);
  }
  lieu = ""
  visitsList: any = [];

  ngOnInit(): void {
    this.lieu = this.authServ.lieu
    this.refreshVisitsList();
  }
  refreshVisitsList() {
    this.service.getVisitsList().subscribe((data) => {
      this.visitsList = data;
    });
  }

  switchAndraharo(){
    this.authServ.lieu = "Andraharo"
    this.lieu = this.authServ.lieu
    this.refreshVisitsList()
  }
  switchAmbohijatovo(){
    this.authServ.lieu = "Ambohijatovo"
    this.lieu = this.authServ.lieu
    this.refreshVisitsList()
  }
  switchMangasoavina(){
    this.authServ.lieu = "Mangasoavina"
    this.lieu = this.authServ.lieu
    this.refreshVisitsList()
  }
}
