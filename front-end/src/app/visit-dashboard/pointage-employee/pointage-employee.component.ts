import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pointage-employee',
  templateUrl: './pointage-employee.component.html',
  styleUrls: ['./pointage-employee.component.css']
})
export class PointageEmployeeComponent implements OnInit {

  lieu = "";
  pointages : any = []

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.lieu = this.authServ.lieu;
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

}
