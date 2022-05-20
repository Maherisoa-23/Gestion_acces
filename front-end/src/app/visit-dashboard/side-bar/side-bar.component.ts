import { DatePipe } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  Date : any;
  Connection : any;

  constructor(private authService: AuthService, private route: Router, private datePipe: DatePipe, private toast : NgToastService) {}

  ngOnInit(): void {
    
    
    setTimeout(() => {
      this.Connection = JSON.parse(localStorage.getItem('connection') || '{}');
      this.User = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = this.User.user_name;
      const Lieu = JSON.parse(localStorage.getItem('lieu') || '{}')
      this.lieu = Lieu.lieu_name
      this.lieu_id = Lieu.lieu_id
    }, 1000);
  }

  onSignOut() {
    this.authService.signOut();
    this.authService.getLieu(this.lieu_id).subscribe((data) => {
      this.Lieu = data;
    });
    setTimeout(() => {
      this.Lieu.isActive = false
      this.authService.putLieu(this.Lieu).subscribe((res) => {
        console.log(res.toString());
      });
      this.route.navigate(['authentification']);
      this.msgSignOut()
    }, 500);
    //this.saveConnectionRegister();
    localStorage.removeItem('lieu');
    localStorage.removeItem('user');
    
    
  }

  showActiveVisit(){
    this.route.navigate(['agent/visit-active'])
  }
  PointageView(){
    this.route.navigate(['agent/pointage'])
  }

  saveConnectionRegister() {
    this.Date = new Date();
    const date = this.datePipe.transform(this.Date, 'dd-MM-yyyy');
    this.heure = this.datePipe.transform(this.Date, 'h:mm:ss a');

    var val = {
      numero_matricule: this.User.numero_matricule,
      date: date,
      lieu: this.lieu,
      entry_time : this.Connection.entry_time,
      exit_time: this.heure.toString(),
    };
  }

  showAccueil() {
    this.route.navigate(['agent/'])
  }

  msgSignOut() {
    this.toast.success({
      detail: 'Deconnexion',
      summary: 'Vous êtes déconnecté',
      duration: 4000,
    });
  }
}
