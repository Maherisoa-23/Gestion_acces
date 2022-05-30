import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { SecurityAgentService } from 'src/app/services/security-agent.service'; 
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-calendrier-visite',
  templateUrl: './calendrier-visite.component.html',
  styleUrls: ['./calendrier-visite.component.css']
})
export class CalendrierVisiteComponent implements OnInit {

  visits_register: any = [];
  post: any = [];
  calendarOptions: CalendarOptions | any;
  val: any;

  constructor(private visitServ: VisitService, private SecurityServ: SecurityAgentService, private route: Router) { }

  handleDateClick(arg: any) { 
    //this.visitServ.dateDailyPointage = arg.dateStr;
    //this.route.navigate(['admin/unique-pointage']);
  }

  ngOnInit(): void {
    this.refreshVisitsRegisterList();
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


  refreshVisitsRegisterList() {
    this.visitServ.getVisitsRegister().subscribe((data) => {
      this.visits_register = data;
    });
  }



  getPresentDate() {
    for (let index = 0; index < this.visits_register.length; index++) {
      const element = this.visits_register[index];
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
