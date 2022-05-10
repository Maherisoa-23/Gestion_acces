import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pointage-register',
  templateUrl: './pointage-register.component.html',
  styleUrls: ['./pointage-register.component.css']
})
export class PointageRegisterComponent implements OnInit {

  dep_croissant = false
  trie_dep = false
  entry_time_croissant = false
  trie_entry_time = false
  exit_time_croissant = false
  trie_exit_time = false
  date_croissant = false
  trie_date = false
  nom_croissant = false
  trie_nom = false

  pointages: any;
  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.refreshPointageRegisterList();
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointages = data;
    });
  }

  SortByDep(){
    this.trie_dep = true
    this.trie_date = this.trie_entry_time = this.trie_exit_time = this.trie_nom = false
    if (!this.dep_croissant) {
      this.pointages.sort((a : any,b : any) => a.employee_dep_name.localeCompare(b.employee_dep_name));
      this.dep_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.employee_dep_name.localeCompare(b.employee_dep_name));
      this.dep_croissant = false
    }
  }

  SortByEntryTime(){
    this.trie_entry_time = true
    this.trie_date = this.trie_dep = this.trie_exit_time = this.trie_nom = false
    if (!this.entry_time_croissant) {
      this.pointages.sort((a : any,b : any) => a.entry_time.localeCompare(b.entry_time));
      this.entry_time_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.entry_time.localeCompare(b.entry_time));
      this.entry_time_croissant = false
    }
  }

  SortByExitTime(){
    this.trie_exit_time = true
    this.trie_date = this.trie_dep = this.trie_entry_time = this.trie_nom = false
    if (!this.exit_time_croissant) {
      this.pointages.sort((a : any,b : any) => a.exit_time.localeCompare(b.exit_time));
      this.exit_time_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.exit_time.localeCompare(b.exit_time));
      this.exit_time_croissant = false
    }
  }

  SortByDate(){
    this.trie_date = true
    this.trie_exit_time = this.trie_dep = this.trie_entry_time = this.trie_nom = false
    if (!this.date_croissant) {
      this.pointages.sort((a : any,b : any) => a.date.localeCompare(b.date));
      this.date_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.date.localeCompare(b.date));
      this.date_croissant = false
    }
  }

  SortByName(){
    this.trie_nom = true
    this.trie_exit_time = this.trie_dep = this.trie_entry_time = this.trie_date = false
    if (!this.nom_croissant) {
      this.pointages.sort((a : any,b : any) => a.employee_name.localeCompare(b.employee_name));
      this.nom_croissant = true
    }
    else {
      this.pointages.sort((b : any,a : any) => a.employee_name.localeCompare(b.employee_name));
      this.nom_croissant = false
    }
  }
}
