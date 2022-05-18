import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unique-pointage',
  templateUrl: './unique-pointage.component.html',
  styleUrls: ['./unique-pointage.component.css']
})
export class UniquePointageComponent implements OnInit {
  numero_matricule = 5
  date = "2022-05-16"
  constructor() { }

  ngOnInit(): void {
  }

  getDailyPointage() {
    
  }

}
