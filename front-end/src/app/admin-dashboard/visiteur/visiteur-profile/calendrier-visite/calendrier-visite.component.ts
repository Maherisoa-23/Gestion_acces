import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service'; 

@Component({
  selector: 'app-calendrier-visite',
  templateUrl: './calendrier-visite.component.html',
  styleUrls: ['./calendrier-visite.component.css']
})
export class CalendrierVisiteComponent implements OnInit {

  matricule_security = 5;
  pointages: any = [];
  pointage_register: any = [];
  post: any = [];
  calendarOptions: CalendarOptions | any;
  val: any;

  constructor(private authServ: AuthService, private SecurityServ: SecurityAgentService, private route: Router) { }

  handleDateClick(arg: any) {
    this.authServ.numero_matricule = this.matricule_security;
    this.authServ.dateDailyPointage = arg.dateStr;
    this.route.navigate(['admin/unique-pointage']);
  }

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    if (this.SecurityServ.matricule_security != 0)
      this.matricule_security = this.SecurityServ.matricule_security;
    setTimeout(() => {
      this.getLastPointageBySec(this.matricule_security);
    }, 500)
    setTimeout(() => {
      this.getPresentDate()
    }, 1000);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this), // bind is important!
        events: this.post
      };
    }, 1000);
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
        this.pointages.push(element)
      }
    }
  }
  getPresentDate() {
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      let entry_time = this.convertTime(element.entry_time);
      if (element.lieu == "Ambohijatovo") {
        this.val = {
          title: entry_time + " - " + this.convertTime(element.exit_time), date: element.date, color: "#c92128"
        }
      } else if (element.lieu == "Andraharo") {
        this.val = {
          title: entry_time + " - " + this.convertTime(element.exit_time), date: element.date, color: "#35aa49"
        }
      } else {
        this.val = {
          title: entry_time + " - " + this.convertTime(element.exit_time), date: element.date, color: "#1e546b"
        }
      }
      this.post.push(this.val)
    }
  }

  convertTime(timeString: string) {
    let timeTokens = timeString.split(':');
    let hour = timeTokens[0];
    let min = timeTokens[1];
    return hour + "h" + min;
  }

}
