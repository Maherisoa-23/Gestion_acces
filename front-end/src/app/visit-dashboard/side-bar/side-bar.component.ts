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

  userName = "";
  heure : any;
  myScriptElement: any;


  constructor(private authService: AuthService, private route: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

  onSignOut() {
    this.authService.signOut();
    localStorage.removeItem('user1');
    this.saveConnectionRegister();
    this.route.navigate(['authentification']);

    //pour effacer le script de l'authentification afin qu'il ne se répète pas
    this.myScriptElement = document.body.lastChild
    document.body.removeChild(this.myScriptElement)
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
    var val2 = {
      date: this.authService.date,
      lieu: this.authService.lieu,
      entry_time : "",
      exit_time : "",
    };

    this.authService.deletePointage(this.authService.numero_matricule).subscribe((res) => {
      console.log(res.toString() + " from the pointage list");
    });
    this.authService.putActiveConnection(val2).subscribe((res) => {
      console.log(res.toString());
    });
    this.authService.addConnectionRegister(val).subscribe((res) => {
      console.log(res.toString() + " to the connection register list");
    });
    this.authService.addPointageRegister(val).subscribe((res) => {
      console.log(res.toString() + " to the pointage register list");
    });
  }

}
