import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-visit-dashboard',
  templateUrl: './visit-dashboard.component.html',
  styleUrls: ['./visit-dashboard.component.css']
})
export class VisitDashboardComponent implements OnInit {
  isAdmin = false;

  constructor(private service: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.service.isAdmin
    console.log(this.service.lieu)
  }

}
