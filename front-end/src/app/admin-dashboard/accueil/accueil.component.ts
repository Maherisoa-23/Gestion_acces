import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  activeConnections : any ;
  pointages : any;
  activeSecurityList : any;
  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.refreshActiveConnectionsList();
    this.refreshPointageList();
    this.refreshActiveSecurityList();
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

  refreshActiveSecurityList() {
    this.authServ.getPointageByDep(3).subscribe((data) => {
      this.activeSecurityList = data
    });
  }

}
