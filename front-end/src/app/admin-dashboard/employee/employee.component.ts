import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: any;
  pointage_register: any;
  pointages: any;
  last_pointage: any;
  trie_nom = false;
  trie_matricule = false;
  nom_croissant = false;
  matricule_croissant = false;
  departments: any;

  constructor(
    private authServ: AuthService,
    // private SecurityServ: SecurityAgentService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    this.refreshDepList();
    setTimeout(() => {
      this.refreshSecurityList();
    }, 500);
  }
  refreshDepList() {
    this.authServ.getDepartmentList().subscribe((data) => {
      this.departments = data;
    });
  }

  refreshSecurityList() {
    this.authServ.getEmployeeList().subscribe((data) => {
      this.employees = data;
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

  SortByName() {
    this.trie_nom = true;
    this.trie_matricule = false;
    if (!this.nom_croissant) {
      this.employees.sort((a: any, b: any) =>
        a.employee_name.localeCompare(b.employee_name)
      );
      this.nom_croissant = true;
    } else {
      this.employees.sort((b: any, a: any) =>
        a.employee_name.localeCompare(b.employee_name)
      );
      this.nom_croissant = false;
    }
  }

  SortByMatricule() {
    this.trie_matricule = true;
    this.trie_nom = false;
    if (!this.matricule_croissant) {
      this.employees.sort(
        (a: any, b: any) => a.numero_matricule - b.numero_matricule
      );
      this.matricule_croissant = true;
    } else {
      this.employees.sort(
        (b: any, a: any) => a.numero_matricule - b.numero_matricule
      );
      this.matricule_croissant = false;
    }
  }
}
