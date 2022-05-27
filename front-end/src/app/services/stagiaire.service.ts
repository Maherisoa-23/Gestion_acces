import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {
  stagiaire_name = ""
  departement = ""
  description = ""
  start_date = ""
  end_date = ""
  isActif = true
  constructor() { }
}
