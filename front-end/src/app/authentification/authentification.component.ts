import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
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
  @Input() selected_lieu = "";
  Lieu: any; // Objet
  lieux: any = [];
  lieux_name: any = []
  date: any;
  heure: any;

  //pour verifier si la connection est déja existante
  tmptab: any = []

  usersList: any = [];
  myScriptElement: HTMLScriptElement;
  //myScriptElement: HTMLScriptElement;
  constructor(private authService: AuthService, private router: Router, private datePipe: DatePipe) {
    this.myScriptElement = document.createElement('script');

    this.myScriptElement.src = 'assets/javascript/authentification.js';
    this.myScriptElement.type = 'text/javascript';
    document.body.appendChild(this.myScriptElement);

  }

  ngOnInit(): void {
    const lieu = JSON.parse(localStorage.getItem('lieu') || '{}')
    console.log("lieu = " + localStorage.getItem('lieu'))
    this.refreshLieuList();
    this.refreshUsersList();
    this.refreshActiveConnectionList();
    this.authStatus = this.authService.isAuth;
  }

  getLieuId(lieu: string) {
    if (lieu == 'Ambohijatovo') return 1;
    else {
      if (lieu == 'Andraharo') return 2;
      else if (lieu == "Mangasoavina") return 3;
      else return 4;
    }

  }

  refreshLieuList() {
    this.authService.getLieuList().subscribe((data) => {
      this.lieux = data;
    });
    setTimeout(() => {
      for (let index = 0; index < this.lieux.length; index++) {
        const element = this.lieux[index];
        if (!element.isActive) {
          this.lieux_name.push(element.lieu_name);
        }
      }
    }, 500)
  }

  refreshUsersList() {
    this.authService.getUsersList().subscribe((data) => {
      this.usersList = data;
    });
  }

  refreshActiveConnectionList() {
    this.authService.getActiveConnectionList().subscribe((data) => {
      this.tmptab = data;
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
        this.authService.lieu = this.selected_lieu
        //si Admin
        if (element.numero_matricule == 1) {
          this.authService.isAdmin = true
          this.authService.signIn().then(() => {
            this.authStatus = this.authService.isAuth;
            this.authService.userName = element.user_name;
            this.router.navigate(['admin']);
            localStorage.setItem('admin1', JSON.stringify(element));
          });

        }
        //si agent de sécurité
        else {
          this.authService.signIn().then(() => {
            this.authStatus = this.authService.isAuth;
            this.authService.userName = element.user_name;
            this.router.navigate(['accueil']);
          });
          console.log("lieu this  = " + this.authService.lieu);
          this.authService.getTotalNumberOfEmployeeByPlace(this.getLieuId(this.authService.lieu)).subscribe((data) => {
            this.Lieu = data;
          });

          setTimeout(() => {

            this.Lieu.isActive = true
            this.authService.putLieu(this.Lieu).subscribe((res) => {
              console.log(res.toString());
            });
            localStorage.setItem('lieu', JSON.stringify(this.Lieu));
          }, 1000);

          localStorage.setItem('user1', JSON.stringify(element));
          this.saveConnection()
        }
        break;
      }
    }
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
      lieu: this.selected_lieu,
      entry_time: this.heure.toString()
    };

    this.authService.addPointage(val).subscribe((res) => {
      console.log(res.toString() + " to the pointage list");
    });
    this.authService.putActiveConnection(val).subscribe((res) => {
      console.log(res.toString());
    });

  }
}
