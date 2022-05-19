import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-unique-pointage',
  templateUrl: './unique-pointage.component.html',
  styleUrls: ['./unique-pointage.component.css']
})
export class UniquePointageComponent implements OnInit {
  numero_matricule = 5
  date = "2022-05-10"
  dailyPointages : any  
  constructor(private authServ : AuthService) { }

  ngOnInit(): void {
    if (this.authServ.numero_matricule !=0 && this.authServ.dateDailyPointage != ""){
      this.numero_matricule = this.authServ.numero_matricule
      this.date = this.authServ.dateDailyPointage
    }
    this.getDailyPointage();
  }

  getDailyPointage() {
    const val = {
      "numero_matricule" : this.numero_matricule,
      "date": this.date
    }
  
    this.authServ.getPointageByLieuAndDate(val).subscribe((data) => {
      this.dailyPointages = data;
    });
  }

}
