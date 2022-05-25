import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar-a',
  templateUrl: './side-bar-a.component.html',
  styleUrls: ['./side-bar-a.component.css']
})
export class SideBarAComponent implements OnInit {

  userName = "";
  myScriptElement : any;
  constructor(private authService: AuthService, private route: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

  onSignOut() {
    this.authService.signOut();
    setTimeout(() => {
      this.route.navigate(['authentification']);
    }, 500)
    localStorage.removeItem('admin1');
    setTimeout(() => {
      this.msgSignOut()
    }, 550);
    //pour effacer le script de l'authentification afin qu'il ne se répète pas
    
  }

  showAccueil() {
    this.route.navigate(['admin/'])
  }

  msgSignOut() {
    this.toast.success({
      detail: 'Deconnexion',
      summary: 'Vous êtes déconnecté',
      duration: 4000,
    });
  }
}
