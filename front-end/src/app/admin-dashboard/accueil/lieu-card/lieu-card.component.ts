import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lieu-card',
  templateUrl: './lieu-card.component.html',
  styleUrls: ['./lieu-card.component.css']
})
export class LieuCardComponent implements OnInit {
  @Input() lieu = ""
  @Input() employee_name = ""
  @Input() entry_time = ""
  nb_visite = 0
  nb_pointage = 0
  tab: any;

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.refreshCounting();
  }

  getLieuId(lieu: string) {
    if (lieu == "Ambohijatovo") return 1
    else {
      if (lieu == "Andraharo") return 2
      else return 3
    }
  }

  refreshCounting() {
    const l = this.lieu
    this.authServ.getCountingFilterByPlace(this.getLieuId(this.lieu)).subscribe((data) => {
      this.tab = data;
      this.nb_visite = this.tab.nb_visit;
      this.nb_pointage = this.tab.nb_pointage;
    });
  }

}
