import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visit-register',
  templateUrl: './visit-register.component.html',
  styleUrls: ['./visit-register.component.css']
})
export class VisitRegisterComponent implements OnInit {

  visitsRegister : any;

  constructor(private visitServ: VisitService) { }

  ngOnInit(): void {
    this.refreshVisitRegisterList();
  }

  refreshVisitRegisterList() {
    this.visitServ.getVisitsRegister().subscribe((data) => {
      this.visitsRegister = data;
    });
  }

}
