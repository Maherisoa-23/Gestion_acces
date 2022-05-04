import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  providers: [DatePipe]
})
export class AuthentificationComponent implements OnInit {
  authStatus!: boolean;
  authName!: string;
  @Input() numero_matricule: string = '';
  @Input() password: string = '';
  @Input() lieu = "Ambohijatovo";
  lieux = ["Ambohijatovo", "Andraharo", "Mangasoavina"];
  date: any;
  heure: any;

  usersList: any = [];
  myScriptElement: HTMLScriptElement;
  constructor(private authService: AuthService, private router: Router, private datePipe: DatePipe) {
    this.myScriptElement = document.createElement('script');

    this.myScriptElement.src = 'assets/javascript/authentification.js';
    this.myScriptElement.type = 'text/javascript';

    document.body.appendChild(this.myScriptElement);
   
  }

  ngOnInit(): void {
    this.usersList = this.refreshUsersList();
    this.authStatus = this.authService.isAuth;
  }

  refreshUsersList() {
    this.authService.getUsersList().subscribe((data) => {
      this.usersList = data;
    });
  }

  onSignIn() {
    const md5 = new Md5()
    const pass = md5.appendStr(this.password).end().toString()

    for (let index = 0; index < this.usersList.length; index++) {
      const element = this.usersList[index];
      if (
        element.numero_matricule == this.numero_matricule &&
        element.password == pass
      ) {
        this.authService.lieu = this.lieu
        if (element.numero_matricule == 1) {
          this.authService.isAdmin = true
          this.authService.signIn().then(() => {
            this.authStatus = this.authService.isAuth;
            this.authService.userName = element.user_name;
            this.router.navigate(['admin']);
          });
          localStorage.setItem('admin1', JSON.stringify(element[index]));
        }
        else {
          console.log(this.authService.lieu)
          this.authService.signIn().then(() => {
            this.authStatus = this.authService.isAuth;
            this.authService.userName = element.user_name;
            this.router.navigate(['accueil']);
          });
          localStorage.setItem('user1', JSON.stringify(element[index]));
          this.saveConnection()

        }
        break;

      }
    }
    
  }
  onSubmit(form: NgForm) {
    const name = form.value['Username'];
    const password = form.value['password'];
    this.authName = name;
  }

  saveConnection() {
    this.date = new Date();
    this.heure = new Date();
    this.heure = this.datePipe.transform(this.date, 'h:mm:ss a');
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.authService.date = this.date.toString()
    this.authService.userLoginTime = this.heure.toString()
    this.authService.numero_matricule = this.numero_matricule


    var val = {
      numero_matricule: this.numero_matricule,
      date: this.date.toString(),
      lieu: this.lieu,
      entry_time: this.heure.toString()
    };

    this.authService.addPointage(val).subscribe((res) => {
      console.log(res.toString() + " to the pointage list");
    });
    this.authService.addActiveConnection(val).subscribe((res) => {
      console.log(res.toString() + " to the active connection list");
    });
  }
}
