import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-active-visit',
  templateUrl: './list-active-visit.component.html',
  styleUrls: ['./list-active-visit.component.css'],
})
export class ListActiveVisitComponent implements OnInit {
  constructor() {}

  ActivatedAddVisit: boolean = false;
  visite: any;
  ngOnInit(): void {}
  addClick() {}
}
