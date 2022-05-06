import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pointage-register',
  templateUrl: './pointage-register.component.html',
  styleUrls: ['./pointage-register.component.css']
})
export class PointageRegisterComponent implements OnInit {

  dep_croissant = false
  entry_time_croissant = false
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

  SortByDep(){
    if (!this.dep_croissant) {
      this.pointages.sort((a : any,b : any) => a.employee_dep_name.localeCompare(b.employee_dep_name));
      this.dep_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.employee_dep_name.localeCompare(b.employee_dep_name));
      this.dep_croissant = false
    }
  }

  SortByEntryTime(){
    if (!this.entry_time_croissant) {
      this.pointages.sort((a : any,b : any) => a.entry_time.localeCompare(b.entry_time));
      this.entry_time_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.entry_time.localeCompare(b.entry_time));
      this.entry_time_croissant = false
    }
  }
}
