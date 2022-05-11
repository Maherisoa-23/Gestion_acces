import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';

@Component({
  selector: 'app-security-agent',
  templateUrl: './security-agent.component.html',
  styleUrls: ['./security-agent.component.css']
})
export class SecurityAgentComponent implements OnInit {

  securities : any ;
  pointage_register : any ;
  last_pointage : any ;
  trie_nom = false;
  trie_matricule = false;
  nom_croissant = false;
  matricule_croissant = false;

  constructor(private authServ: AuthService, private SecurityServ: SecurityAgentService, private route: Router) { }

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    setTimeout( () => {
      this.refreshSecurityList();
    },500)
  }

  refreshSecurityList() {
    this.authServ.getEmployeeListByDep(3).subscribe((data) => {
      this.securities = data;
    });
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointage_register = data;
    });
  }

  getLastPointageBySec(matricule : number) {
    for (let index = 0; index < this.pointage_register.length; index++) {
      const element = this.pointage_register[index];
      if (element.numero_matricule == matricule) {
        this.last_pointage = element
      }
    }
    return "le " + this.last_pointage.date +" "+ this.last_pointage.exit_time + " à " + this.last_pointage.lieu 
  }

  SortByName(){
    this.trie_nom = true
    this.trie_matricule = false
    if (!this.nom_croissant) {
      this.securities.sort((a : any,b : any) => a.employee_name.localeCompare(b.employee_name));
      this.nom_croissant = true
    }
    else {
      this.securities.sort((b : any,a : any) => a.employee_name.localeCompare(b.employee_name));
      this.nom_croissant = false
    }
  }

  SortByMatricule(){
    this.trie_matricule = true
    this.trie_nom = false
    if (!this.matricule_croissant) {
      this.securities.sort((a : any,b : any) => a.numero_matricule - b.numero_matricule);
      this.matricule_croissant = true
    }
    else {
      this.securities.sort((b : any,a : any) => a.numero_matricule - b.numero_matricule);
      this.matricule_croissant = false
    }
  }

  ShowSecurityProfile(security : any) {
    this.SecurityServ.matricule_security = security.numero_matricule;
    this.SecurityServ.security_name = security.employee_name;
    this.route.navigate(['admin/security-profile'])
  }


}
