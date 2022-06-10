import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {
  vehicule_id = 0
  stagiaire_id = 0
  stagiaire_name = ""
  departement = ""
  description = ""
  start_date = ""
  end_date = ""
  isActif = true
  photoPath = ""
  constructor() { }
}
