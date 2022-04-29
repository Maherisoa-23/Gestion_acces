import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-pointage-employee',
  templateUrl: './pointage-employee.component.html',
  styleUrls: ['./pointage-employee.component.css'],
  providers: [DatePipe]
})
export class PointageEmployeeComponent implements OnInit {

  @Input() numero_matricule = 0;
  @Input() password = "";

  lieu = "";
  pointages: any = [];
  employees: any = [];
  date: any;
  heure: any;

  constructor(private authServ: AuthService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.lieu = this.authServ.lieu;
    this.refreshPointageList();
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  getEmployeeList() {
    this.authServ.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });
  }

  OnEnter() {
    const md5 = new Md5()
    const pass = md5.appendStr(this.password).end().toString()

    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (
        element.numero_matricule == this.numero_matricule &&
        element.password == pass
      ) {
        this.date = new Date();
        this.heure = new Date();
        this.heure = this.datePipe.transform(this.date, 'h:mm:ss a');
        this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        var val = {
          employee: 5,
          date: this.date.toString(),
          lieu: this.lieu,
          entry_time: this.heure.toString()
        };

        this.authServ.addPointage(val).subscribe((res) => {
          console.log(res.toString());
        });
        break;
      }

    }

    this.refreshPointageList();
    this.refreshPointageList();
    this.numero_matricule = 0
    this.password = ""
  }

}
