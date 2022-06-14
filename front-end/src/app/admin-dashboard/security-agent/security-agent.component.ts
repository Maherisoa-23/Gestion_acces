import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';

@Component({
  selector: 'app-security-agent',
  templateUrl: './security-agent.component.html',
  styleUrls: ['./security-agent.component.css'],
})
export class SecurityAgentComponent implements OnInit {
  employees: any;
  pointage_register: any;
  pointages: any;
  last_pointage: any;
  tab : any = []

  @Input() numero_matricule = 0;
  @Input() user_name = ""

  readonly direction_security = 3;

  constructor(
    private authServ: AuthService,
    private SecurityServ: SecurityAgentService,
    private route: Router,
    private toast: NgToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    this.refreshSecurityList();
  }

  refreshSecurityList() {
    this.authServ
      .getEmployeeList()
      .subscribe((data) => {
        this.employees = data;
      });
    /* setTimeout(() => {
      for (let index = 0; index < this.employees.length; index++) {
        const element = this.employees[index];
        if (element.function == "AGENT DE SECURITE") {
          this.tab.push(element)
        }
      }
    }, 500); */
    this.authServ.getUsersList().subscribe((data) => {
      this.tab = data
    })
  }

  refreshPointageList() {
    this.authServ.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }

  //Methode pour les modals
  showModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll()
    this.reinitialisationDonnee()
  }

  reinitialisationDonnee() {
    this.user_name = '';
    this.numero_matricule = 0;
  }

  addUser() {
    const val = {
      user_name : this.user_name,
      numero_matricule : this.numero_matricule
    }
    this.authServ.addUser(val).subscribe((res) => {
      this.showSuccess(res.toString())
    })
    setTimeout(() => {
      this.refreshSecurityList()
    }, 500);
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

  getSecurity(name : string) {
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];
      if (element.employee_name == name) {
        return element
      }
    }
  }

  ShowEmployeeProfile(emp: any) {
    this.authServ.refreshPointageList();
    setTimeout(() => {
      this.SecurityServ.matricule_security = emp.numero_matricule;
      this.SecurityServ.security_name = emp.employee_name;
      this.SecurityServ.pointed_at = emp.pointed_at;
      this.SecurityServ.photoName = emp.photoName;
      this.SecurityServ.fonction = emp.function;
      this.SecurityServ.direction = emp.department_name;
      this.route.navigate(['admin/employee-profile']);
    }, 500);
  }

  //Les messages
  showSuccess(msg: string) {
    this.toast.success({
      detail: 'SUCCESS',
      summary: msg,
      duration: 3000,
    });
  }
  showError(msg: string) {
    this.toast.error({
      detail: 'ERROR',
      summary: msg,
      duration: 3000,
    });
  }
}
