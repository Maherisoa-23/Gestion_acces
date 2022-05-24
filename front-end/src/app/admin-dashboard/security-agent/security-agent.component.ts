import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';

@Component({
  selector: 'app-security-agent',
  templateUrl: './security-agent.component.html',
  styleUrls: ['./security-agent.component.css'],
})
export class SecurityAgentComponent implements OnInit {
  securities: any;
  pointage_register: any;
  pointages: any;
  last_pointage: any;
  trie_nom = false;
  trie_matricule = false;
  nom_croissant = false;
  matricule_croissant = false;

  readonly direction_security = 3;

  constructor(
    private authServ: AuthService,
    private SecurityServ: SecurityAgentService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    setTimeout(() => {
      this.refreshSecurityList();
    }, 500);
  }

  //security = user
  refreshSecurityList() {
    this.authServ
      .getUsersList()
      .subscribe((data) => {
        this.securities = data;
      });
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointage_register = data;
    });
  }

  getLastPointageBySec(matricule: number) {
    for (let index = 0; index < this.pointage_register.length; index++) {
      const element = this.pointage_register[index];
      if (element.numero_matricule == matricule) {
        this.last_pointage = element;
        return (
          'le ' +
          this.last_pointage.date +
          ' ' +
          this.last_pointage.exit_time +
          ' à ' +
          this.last_pointage.lieu
        );
      }
    }
    return " - "
  }

  ShowSecurityProfile(security: any) {
    this.authServ.refreshPointageList();
    setTimeout(() => {
      this.SecurityServ.matricule_security = security.numero_matricule;
      this.SecurityServ.security_name = security.user_name;
      this.SecurityServ.pointed_at = security.pointed_at;
      this.route.navigate(['admin/security-profile']);
    }, 1000);
  }
}
