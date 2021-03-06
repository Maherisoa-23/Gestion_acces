import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityAgentService } from 'src/app/services/security-agent.service';

@Component({
  selector: 'app-clocking-schedule',
  templateUrl: './clocking-schedule.component.html',
  styleUrls: ['./clocking-schedule.component.css'],
  providers: [DatePipe],
})
export class ClockingScheduleComponent implements OnInit {

  employee_name = ""
  pointages: any = [];
  pointage_register: any = [];
  post: any = [];
  calendarOptions: CalendarOptions | any;
  val: any;

  constructor(private authServ: AuthService, private SecurityServ: SecurityAgentService, private route: Router) { }

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    if (this.SecurityServ.security_name != "")
      this.employee_name = this.SecurityServ.security_name;
    setTimeout(() => {
      this.getLastPointageBySec(this.employee_name);
    }, 500)
    setTimeout(() => {
      this.addEvent()
    }, 500);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth', // bind is important!
        events: this.post,
        dateClick : this.handleDateClick.bind(this),
      };
    }, 700);
  }

  checkIfEvent(date : string) {
    for (let index = 0; index < this.post.length; index++) {
      const element = this.post[index];
      if (element.date == date) {
        return true
      }
    }
    return false
  }
  
  handleDateClick(arg: any) {
    if(this.checkIfEvent(arg.dateStr)){
      this.authServ.employee_name = this.employee_name
      this.authServ.dateDailyPointage = arg.dateStr;
      this.route.navigate(['admin/unique-pointage']);
    }  
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointage_register = data;
    });
  }
  getLastPointageBySec(employee_name: string) {
    for (let index = 0; index < this.pointage_register.length; index++) {
      const element = this.pointage_register[index];
      if (element.employee_name == employee_name) {
        this.pointages.push(element)
      }
    }
  }
  addEvent() {
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
