import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
@Injectable()
export class SideBarComponent implements OnInit {
  userName = "";
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

  onSignOut() {
    this.authService.signOut();
    localStorage.removeItem('user1');
    this.route.navigate(['authentification']);
  }

  showActiveVisit(){
    this.route.navigate(['accueil/visit-active'])
  }
  PointageView(){
    this.route.navigate(['accueil/pointage'])
  }

}
