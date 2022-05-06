import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pointage-register',
  templateUrl: './pointage-register.component.html',
  styleUrls: ['./pointage-register.component.css']
})
export class PointageRegisterComponent implements OnInit {

  pointages: any;
  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.refreshPointageRegisterList();
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointages = data;
    });
  }
}
