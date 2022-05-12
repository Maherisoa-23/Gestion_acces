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

  User : any;
  Lieu : any;
  lieu : any;
  lieu_id : any;
  userName = "";
  heure : any;

  constructor(private authService: AuthService, private route: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    
    
    setTimeout(() => {
      this.User = JSON.parse(localStorage.getItem('user1') || '{}');
      this.userName = this.User.user_name;
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}')
      this.lieu = Lieu.lieu_name
      this.lieu_id = Lieu.lieu_id
    }, 1000);
  }

  onSignOut() {
    this.authService.signOut();
    localStorage.removeItem('user1');
    this.authService.getTotalNumberOfEmployeeByPlace(this.lieu_id).subscribe((data) => {
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
    localStorage.removeItem('lieu')
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
    this.authService.deleteActiveConnection(this.lieu_id).subscribe((res) => {
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
