import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  lieu = ""
  pointages: any = [];

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.authServ.lieu = "Ambohijatovo"
    this.lieu = this.authServ.lieu
    this.refreshPointageList();
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  switchAndraharo(){
    this.authServ.lieu = "Andraharo"
    this.lieu = this.authServ.lieu
    this.refreshPointageList()
  }
  switchAmbohijatovo(){
    this.authServ.lieu = "Ambohijatovo"
    this.lieu = this.authServ.lieu
    this.refreshPointageList()
  }
  switchMangasoavina(){
    this.authServ.lieu = "Mangasoavina"
    this.lieu = this.authServ.lieu
    this.refreshPointageList()
  }
}
