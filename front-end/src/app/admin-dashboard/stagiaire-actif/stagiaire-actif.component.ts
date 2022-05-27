import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-stagiaire-actif',
  templateUrl: './stagiaire-actif.component.html',
  styleUrls: ['./stagiaire-actif.component.css'],
})
export class StagiaireActifComponent implements OnInit {
  lieu = '';
  pointages: any = [];

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.lieu = "Ambohijatovo"
    this.refreshPointageList();
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }


  switchAndraharo() {
    this.authServ.lieu = 'Andraharo';
    this.lieu = this.authServ.lieu;
  }
  switchAmbohijatovo() {
    this.authServ.lieu = 'Ambohijatovo';
    this.lieu = this.authServ.lieu;
  }
  switchMangasoavina() {
    this.authServ.lieu = 'Mangasoavina';
    this.lieu = this.authServ.lieu;
  }
}
