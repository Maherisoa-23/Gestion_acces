import { DatePipe } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [DatePipe]
})
@Injectable()
export class SideBarComponent implements OnInit {

  Lieu : any;
  lieu : any;
  userName = "";
  heure : any;

  constructor(private authService: AuthService, private route: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.lieu = this.authService.lieu;
    this.userName = this.authService.userName;
  }

  getLieuId(lieu: string) {
    if (lieu == "Ambohijatovo") return 1
    else {
      if (lieu == "Andraharo") return 2
      else return 3
    }
  }
  onSignOut() {
    this.authService.signOut();
    localStorage.removeItem('user1');
    this.authService.getTotalNumberOfEmployeeByPlace(this.getLieuId(this.lieu)).subscribe((data) => {
      this.Lieu = data;
    });
    setTimeout(() => {
      this.Lieu.isActive = false
      this.authService.putLieu(this.Lieu).subscribe((res) => {
        console.log(res.toString());
      });
    }, 1000);
    this.saveConnectionRegister();
    this.route.navigate(['authentification']);
  }

  showActiveVisit(){
    this.route.navigate(['accueil/visit-active'])
  }
  PointageView(){
    this.route.navigate(['accueil/pointage'])
  }

  saveConnectionRegister() {
    this.heure = new Date();
    this.heure = this.datePipe.transform(this.heure, 'h:mm:ss a');

    var val = {
      numero_matricule: this.authService.numero_matricule,
      date: this.authService.date,
      lieu: this.authService.lieu,
      entry_time : this.authService.userLoginTime,
      exit_time: this.heure.toString(),
    };

    this.authService.deletePointage(this.authService.numero_matricule).subscribe((res) => {
      console.log(res.toString() + " from the pointage list");
    });
    this.authService.deleteActiveConnection(this.getLieuId(this.authService.lieu)).subscribe((res) => {
      console.log(res.toString());
    });
    this.authService.addConnectionRegister(val).subscribe((res) => {
      console.log(res.toString() + " to the connection register list");
    });
    this.authService.addPointageRegister(val).subscribe((res) => {
      console.log(res.toString() + " to the pointage register list");
    });
  }

  showAccueil() {
    this.route.navigate(['accueil/'])
  }

}
