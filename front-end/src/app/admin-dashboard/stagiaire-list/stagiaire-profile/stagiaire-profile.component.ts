import { Component, OnInit } from '@angular/core';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-stagiaire-profile',
  templateUrl: './stagiaire-profile.component.html',
  styleUrls: ['./stagiaire-profile.component.css']
})
export class StagiaireProfileComponent implements OnInit {
stagiaire_name = ""
departement = ""
description = ""
start_date = ""
end_date = ""
status = "Encore actif"

  constructor(private stgServ: StagiaireService) { }

  ngOnInit(): void {
    this.initialisation()
  }

  initialisation() {
    this.stagiaire_name = this.stgServ.stagiaire_name;
    this.departement = this.stgServ.departement;
    this.description = this.stgServ.description;
    this.start_date = this.stgServ.start_date;
    this.end_date = this.stgServ.end_date;
    if (!this.stgServ.isActif) this.status = "non actif"
  }
  
}
