import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  lieu = ""
  pointages: any = [];

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.lieu = this.authServ.lieu;
    this.refreshPointageList();
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }
}