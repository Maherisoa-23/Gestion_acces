import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitService {

  //readonly APIUrl = "http://192.168.1.23:8000"

  readonly APIUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  comment = ""
  visitor_name = ""  
  CIN = 0
  description = ""
  lastVisit : any
  Nbvisit = 0

  //methode pour les visiteurs
  getVisitorList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/visitor/');
  }

  addVisitor(val: any) {
    return this.http.post(this.APIUrl + '/visitor/', val);
  }

  //Methode pour les visit
  getVisitsList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/visit/');
  }

  addVisit(val: any) {
    return this.http.post(this.APIUrl + '/visit/', val);
  }

  deleteVisit(id: number) {
    return this.http.delete(this.APIUrl + '/visit/' + id);
  }

  updateVisit(val: any) {
    return this.http.put(this.APIUrl + '/visit/', val);
  }

  //Methode pour visit register
  addVisitsRegister(val: any) {
    return this.http.post(this.APIUrl + '/visits_register/', val);
  }

  getVisitsRegister(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/visits_register/');
  }
}
