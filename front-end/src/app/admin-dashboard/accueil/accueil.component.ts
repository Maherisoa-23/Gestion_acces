import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  activeConnections: any;
  pointages: any;
  activeSecurityList: any;
  myChart: any;
  admin: any;

  constructor(private authServ: AuthService, private elementRef: ElementRef) {
  }



  ngOnInit(): void {
    if (localStorage.getItem('admin1') != null) {
      this.admin = JSON.parse(localStorage.getItem('admin1') || '{}');
      console.log("admin name = " + this.admin.user_name)
    }
    this.refresh();
  }


  refreshActiveConnectionsList() {
    this.authServ.getActiveConnectionList().subscribe((data) => {
      this.activeConnections = data;
    });
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refresh() {
    this.refreshActiveConnectionsList();
    this.refreshPointageList();
    this.authServ.getPointageByDep(3).subscribe((data) => {
      this.activeSecurityList = data
    });
  }



}
