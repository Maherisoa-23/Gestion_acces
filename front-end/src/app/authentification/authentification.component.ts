import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Md5 } from 'ts-md5';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  providers: [DatePipe],
})
export class AuthentificationComponent implements OnInit {
  authStatus!: boolean;
  authName!: string;
  @Input() numero_matricule: any;
  readonly adminMatricule = 1236;
  @Input() password: string = '';
  @Input() selected_lieu = '';
  Lieu: any; // Objet
  lieux: any = [];
  lieux_name: any = [];
  date: any;
  heure: any;
  ok = false; //pour admin

  input1 = false;
  input2 = false;

  tmptab: any = [];

  usersList: any = [];
  constructor(
    private authService: AuthService,
    private route: Router,
    private datePipe: DatePipe,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) this.route.navigate(['/agent/accueil']);
    this.refreshLieuList();
    this.refreshUsersList();
    this.authStatus = this.authService.isAuth;
  }

  refreshUsersList() {
    this.authService.getUsersList().subscribe((data) => {
      this.usersList = data;
    });
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
    }, 1200);
  }

  onSignIn() {
    for (let index = 0; index < this.usersList.length; index++) {
      const element = this.usersList[index];
      console.log(
        element.numero_matricule == this.numero_matricule &&
          this.selected_lieu != ''
      );

      //admnin
      if (
        this.numero_matricule == this.adminMatricule &&
        this.numero_matricule == element.numero_matricule
      ) {
        this.ok = true;
        const md5 = new Md5();
        const pass = md5.appendStr(this.password).end().toString();
        if (element.password == pass) {
          this.authService.isAdmin = true;
          this.authService.signIn().then(() => {
            this.authStatus = this.authService.isAuth;
            this.authService.userName = element.user_name;

            this.route.navigate(['admin']);
            localStorage.setItem('admin1', JSON.stringify(element));
          });
          this.showSuccess();
          break;
        } else
          this.showError(
            'V??rifier votre num??ro matricule et votre mot de passe'
          );
        break;
      } else {
        if (
          element.numero_matricule == this.numero_matricule &&
          this.selected_lieu != ''
        ) {
          this.authService.lieu = this.selected_lieu;
          //si agent de s??curit??
          this.authService.signIn().then(() => {
            this.authStatus = this.authService.isAuth;
            this.authService.userName = element.user_name;
            this.showSuccess();
            this.route.navigate(['agent/accueil']);
          });
          localStorage.setItem('user', JSON.stringify(element));
          this.authService
            .getLieu(this.getLieuId(this.authService.lieu))
            .subscribe((data) => {
              this.Lieu = data;
            });

          setTimeout(() => {
            this.date = new Date();
            this.heure = new Date();
            this.heure = this.datePipe.transform(this.date, 'h:mm:ss a');
            this.Lieu.isActive = true;
            this.Lieu.entry_time = this.heure.toString();
            this.authService.putLieu(this.Lieu).subscribe((res) => {
              console.log(res.toString());
            });
            localStorage.setItem('lieu', JSON.stringify(this.Lieu));
          }, 500);
          this.saveConnection();
          break;
        }
      }
      setTimeout(() => {
        if (!this.ok)
          this.showError('V??rifier votre num??ro matricule et le choix du lieu');
      }, 500);
    }
  }

  suggested(numero_matricule: any) {
    this.numero_matricule = numero_matricule;
  }

  saveConnection() {
    this.date = new Date();
    this.heure = new Date();
    this.heure = this.datePipe.transform(this.date, 'h:mm:ss a');
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    var val = {
      numero_matricule: this.numero_matricule,
      date: this.date.toString(),
      lieu: this.selected_lieu,
      entry_time: this.heure.toString(),
    };

    this.authService.addPointage(val).subscribe((res) => {
      console.log(res.toString() + ' to the pointage list');
    });
  }

  //Les messages de notification, de succes et d"erreur
  showSuccess() {
    this.toast.success({
      detail: 'Bienvenue',
      summary: 'Vous ??tes connect??',
      duration: 5000,
    });
  }

  showError(msg: string) {
    this.toast.error({
      detail: 'ERROR',
      summary: msg,
      duration: 3000,
    });
  }

  getLieuId(lieu: string) {
    if (lieu == 'Ambohijatovo') return 1;
    else {
      if (lieu == 'Andraharo') return 2;
      else if (lieu == 'Mangasoavina') return 3;
      else return 4;
    }
  }

  //animation du formulaire d'euthentification
  ClickOnInput1() {
    this.input1 = true;
  }
  ClickOnInput2() {
    this.input2 = true;
  }
}
