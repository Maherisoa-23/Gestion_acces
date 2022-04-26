import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  authStatus!: boolean;
  authName!: string;
  @Input() numero_matricule: string = '';
  @Input() password: string = '';

  usersList: any = [];

  constructor(private authService: AuthService, private router: Router) {
    
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
    console.log(pass)
    
    for (let index = 0; index < this.usersList.length; index++) {
      const element = this.usersList[index];
      console.log(element.password)
      if (
        element.numero_matricule == this.numero_matricule &&
        element.password == pass
      ) {
        console.log("tafiditra")
        this.authService.signIn().then(() => {
          this.authStatus = this.authService.isAuth;
          this.authService.userName =
            element.user_first_name + ' ' + element.user_last_name;
          this.router.navigate(['accueil']);
        });
        break;
      }
    }
  }
  onSubmit(form: NgForm) {
    const name = form.value['Username'];
    const password = form.value['password'];
    this.authName = name;
  }
}
