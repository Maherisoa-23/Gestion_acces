import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lieu-details',
  templateUrl: './lieu-details.component.html',
  styleUrls: ['./lieu-details.component.css']
})
export class LieuDetailsComponent implements OnInit {
  lieu = ""
  securities : any = []

  constructor(private authServ : AuthService) { }

  ngOnInit(): void {
    this.lieu = this.authServ.lieu;
    this.getActifSecurity();
  }

  getActifSecurity() {
    const val = { lieu : this.lieu}
    this.authServ.getActifSecurityByLieu(val).subscribe((data) => {
      this.securities = data;
    });
  }

}
