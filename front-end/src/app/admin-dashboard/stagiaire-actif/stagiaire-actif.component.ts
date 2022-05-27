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
    setTimeout(() => {
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}');
      this.lieu = Lieu.lieu_name;
    }, 1000);
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
    this.refreshPointageList();
  }
  switchAmbohijatovo() {
    this.authServ.lieu = 'Ambohijatovo';
    this.lieu = this.authServ.lieu;
    this.refreshPointageList();
  }
  switchMangasoavina() {
    this.authServ.lieu = 'Mangasoavina';
    this.lieu = this.authServ.lieu;
    this.refreshPointageList();
  }
}
