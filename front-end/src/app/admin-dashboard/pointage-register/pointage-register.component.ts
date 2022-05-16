import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-pointage-register',
  templateUrl: './pointage-register.component.html',
  styleUrls: ['./pointage-register.component.css'],
})
export class PointageRegisterComponent implements OnInit {
  dep_croissant = false;
  trie_dep = false;
  entry_time_croissant = false;
  trie_entry_time = false;
  exit_time_croissant = false;
  trie_exit_time = false;
  date_croissant = false;
  trie_date = false;
  nom_croissant = false;
  trie_nom = false;
  trie_lieu = false;
  lieu_croissant = false;

  pointages: any;
  departments: any;
  DateSelected: any;

  filtredPointages: any = [];
  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.refreshPointageRegisterList();
    this.refreshDepList();
    //datepicker
    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(1).search(v).draw();
    });
  }

  refreshPointageRegisterList() {
    this.authServ.getPointageRegisterList().subscribe((data) => {
      this.pointages = data;
    });
  }

  refreshDepList() {
    this.authServ.getDepartmentList().subscribe((data) => {
      this.departments = data;
    });
  }

  /* Les méthodes de triage */
  SortByDep() {
    this.trie_dep = true;
    this.trie_date =
      this.trie_entry_time =
      this.trie_exit_time =
      this.trie_nom =
      this.trie_lieu =
        false;
    if (!this.dep_croissant) {
      this.pointages.sort((a: any, b: any) =>
        a.employee_dep_name.localeCompare(b.employee_dep_name)
      );
      this.dep_croissant = true;
    } else {
      this.pointages.sort((b: any, a: any) =>
        a.employee_dep_name.localeCompare(b.employee_dep_name)
      );
      this.dep_croissant = false;
    }
  }

  SortByEntryTime() {
    this.trie_entry_time = true;
    this.trie_date =
      this.trie_dep =
      this.trie_exit_time =
      this.trie_nom =
      this.trie_lieu =
        false;
    if (!this.entry_time_croissant) {
      this.pointages.sort((a: any, b: any) =>
        a.entry_time.localeCompare(b.entry_time)
      );
      this.entry_time_croissant = true;
    } else {
      this.pointages.sort((b: any, a: any) =>
        a.entry_time.localeCompare(b.entry_time)
      );
      this.entry_time_croissant = false;
    }
  }

  SortByExitTime() {
    this.trie_exit_time = true;
    this.trie_date =
      this.trie_dep =
      this.trie_entry_time =
      this.trie_nom =
      this.trie_lieu =
        false;
    if (!this.exit_time_croissant) {
      this.pointages.sort((a: any, b: any) =>
        a.exit_time.localeCompare(b.exit_time)
      );
      this.exit_time_croissant = true;
    } else {
      this.pointages.sort((b: any, a: any) =>
        a.exit_time.localeCompare(b.exit_time)
      );
      this.exit_time_croissant = false;
    }
  }

  SortByDate() {
    this.trie_date = true;
    this.trie_exit_time =
      this.trie_dep =
      this.trie_entry_time =
      this.trie_nom =
      this.trie_lieu =
        false;
    if (!this.date_croissant) {
      this.pointages.sort((a: any, b: any) => a.date.localeCompare(b.date));
      this.date_croissant = true;
    } else {
      this.pointages.sort((b: any, a: any) => a.date.localeCompare(b.date));
      this.date_croissant = false;
    }
  }

  SortByName() {
    this.trie_nom = true;
    this.trie_exit_time =
      this.trie_dep =
      this.trie_entry_time =
      this.trie_date =
      this.trie_lieu =
        false;
    if (!this.nom_croissant) {
      this.pointages.sort((a: any, b: any) =>
        a.employee_name.localeCompare(b.employee_name)
      );
      this.nom_croissant = true;
    } else {
      this.pointages.sort((b: any, a: any) =>
        a.employee_name.localeCompare(b.employee_name)
      );
      this.nom_croissant = false;
    }
  }
  SortByLieu() {
    this.trie_lieu = true;
    this.trie_date =
      this.trie_entry_time =
      this.trie_exit_time =
      this.trie_nom =
      this.trie_dep =
        false;
    if (!this.lieu_croissant) {
      this.pointages.sort((a: any, b: any) => a.lieu.localeCompare(b.lieu));
      this.lieu_croissant = true;
    } else {
      this.pointages.sort((b: any, a: any) => a.lieu.localeCompare(b.lieu));
      this.lieu_croissant = false;
    }
  }

  //Methode fe filtrage
  @Input() selected_lieu = '';
  @Input() selected_dep = '';
  filtered = false;
  FilterByLieu(lieu_name: string) {
    this.filtered = true;
    this.filtredPointages = [];
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      console.log(element.employee_dep_name);
      if (element.lieu == lieu_name) {
        this.filtredPointages.push(element);
      }
    }
    this.SortByName();
  }

  FilterByDep() {
    this.filtered = true;
    this.filtredPointages = [];
    for (let index = 0; index < this.pointages.length; index++) {
      const element = this.pointages[index];
      if (element.employee_dep_name == this.selected_dep) {
        this.filtredPointages.push(element);
      }
    }
    this.SortByName();
  }

  DepSelected(item: any) {
    this.selected_dep = item.department_name;
    setTimeout(() => {
      this.FilterByDep();
    }, 500);
  }

  AmbohijatovoSelected() {
    this.selected_lieu = 'Ambohijatovo';
    this.FilterByLieu(this.selected_lieu);
  }
  AndraharoSelected() {
    this.selected_lieu = 'Andraharo';
    this.FilterByLieu(this.selected_lieu);
  }
  MangasoavinaSelected() {
    this.selected_lieu = 'Mangasoavina';
    this.FilterByLieu(this.selected_lieu);
  }

  // ChangeDate(DateSelected: Date) {
  //   if(DateSelected == item.date){

  //   }
  // }
}
