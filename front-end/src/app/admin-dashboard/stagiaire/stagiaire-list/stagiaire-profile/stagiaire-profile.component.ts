import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
photoPath = ""

  constructor(private stgServ: StagiaireService, private route: Router) { }

  ngOnInit(): void {
    if (this.stgServ.stagiaire_name == "") this.route.navigate(['/admin/stagiaire-list'])
    this.initialisation() 
  }

  initialisation() {
    this.stagiaire_name = this.stgServ.stagiaire_name;
    this.departement = this.stgServ.departement;
    this.description = this.stgServ.description;
    this.start_date = this.stgServ.start_date;
    this.end_date = this.stgServ.end_date;
    this.photoPath = this.stgServ.photoPath;
    if (!this.stgServ.isActif) this.status = "non actif"
  }
  
}
