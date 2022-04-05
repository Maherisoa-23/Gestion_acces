import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-list-active-visit',
  templateUrl: './list-active-visit.component.html',
  styleUrls: ['./list-active-visit.component.css'],
})
export class ListActiveVisitComponent implements OnInit {
  constructor(private service:VisitService) { }

  visitsList:any = [];

  ngOnInit(): void {
    this.refreshVisitsList();
  }
  refreshVisitsList(){
    this.service.getVisitsList().subscribe(
      data => {
        this.visitsList = data;
      });
  }

  ActivatedAddVisit: boolean = false;
  visite: any;  
  addClick() {}
}
