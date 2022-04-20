import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-side-bar1',
  templateUrl: './side-bar1.component.html',
  styleUrls: ['./side-bar1.component.css'],
})
@Injectable()
export class SideBar1Component implements OnInit {
  userName = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['authentification']);
  }
}
