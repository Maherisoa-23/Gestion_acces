import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar-a',
  templateUrl: './side-bar-a.component.html',
  styleUrls: ['./side-bar-a.component.css']
})
export class SideBarAComponent implements OnInit {

  userName = "";
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

  onSignOut() {
    this.authService.signOut();
    this.route.navigate(['authentification']);
  }

  showAdminVisit(){
    this.route.navigate(['admin/visit-admin'])
  }

  showAdminPointage(){
    this.route.navigate(['admin/pointage-admin'])
  }

}
