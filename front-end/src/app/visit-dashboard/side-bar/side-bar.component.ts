import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
@Injectable()
export class SideBarComponent implements OnInit {
  SecurityName = this.authService;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
