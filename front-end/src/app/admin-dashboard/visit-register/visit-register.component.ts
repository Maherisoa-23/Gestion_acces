import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visit-register',
  templateUrl: './visit-register.component.html',
  styleUrls: ['./visit-register.component.css']
})
export class VisitRegisterComponent implements OnInit {

  lieu_croissant = false
  trie_lieu = false
  entry_time_croissant = false
  trie_entry_time = false
  exit_time_croissant = false
  trie_exit_time = false
  date_croissant = false
  trie_date = false
  nom_croissant = false
  trie_nom = false
  visitsRegister : any;

  constructor(private visitServ: VisitService) { }

  ngOnInit(): void {
    this.refreshVisitRegisterList();
  }

  refreshVisitRegisterList() {
    this.visitServ.getVisitsRegister().subscribe((data) => {
      this.visitsRegister = data;
    });
  }


  /* Les méthodes de triage */
  SortByLieu(){
    this.trie_lieu = true
    this.trie_date = this.trie_entry_time = this.trie_exit_time = this.trie_nom = false
    if (!this.lieu_croissant) {
      this.visitsRegister.sort((a : any,b : any) => a.lieu.localeCompare(b.lieu));
      this.lieu_croissant = true
    }
    else {
      this.visitsRegister.sort((b : any,a : any) => a.lieu.localeCompare(b.lieu));
      this.lieu_croissant = false
    }
  }

  SortByEntryTime(){
    this.trie_entry_time = true
    this.trie_date = this.trie_lieu = this.trie_exit_time = this.trie_nom = false
    if (!this.entry_time_croissant) {
      this.visitsRegister.sort((a : any,b : any) => a.entry_time.localeCompare(b.entry_time));
      this.entry_time_croissant = true
    }
    else {
      this.visitsRegister.sort((b : any,a : any) => a.entry_time.localeCompare(b.entry_time));
      this.entry_time_croissant = false
    }
  }

  SortByExitTime(){
    this.trie_exit_time = true
    this.trie_date = this.trie_lieu = this.trie_entry_time = this.trie_nom = false
    if (!this.exit_time_croissant) {
      this.visitsRegister.sort((a : any,b : any) => a.exit_time.localeCompare(b.exit_time));
      this.exit_time_croissant = true
    }
    else {
      this.visitsRegister.sort((b : any,a : any) => a.exit_time.localeCompare(b.exit_time));
      this.exit_time_croissant = false
    }
  }

  SortByDate(){
    this.trie_date = true
    this.trie_exit_time = this.trie_lieu = this.trie_entry_time = this.trie_nom = false
    if (!this.date_croissant) {
      this.visitsRegister.sort((a : any,b : any) => a.date.localeCompare(b.date));
      this.date_croissant = true
    }
    else {
      this.visitsRegister.sort((b : any,a : any) => a.date.localeCompare(b.date));
      this.date_croissant = false
    }
  }

  SortByName(){
    this.trie_nom = true
    this.trie_exit_time = this.trie_lieu = this.trie_entry_time = this.trie_date = false
    if (!this.nom_croissant) {
      this.visitsRegister.sort((a : any,b : any) => a.visitor_name.localeCompare(b.visitor_name));
      this.nom_croissant = true
    }
    else {
      this.visitsRegister.sort((b : any,a : any) => a.visitor_name.localeCompare(b.visitor_name));
      this.nom_croissant = false
    }
  }
}
