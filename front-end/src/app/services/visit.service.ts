import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  // pour deploiement : readonly APIUrl = "http://192.168.1.253:8000"


  readonly APIUrl = "http://localhost:8000"
  constructor(private http: HttpClient) { }
  
  getVisitsList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/visit/');
  }

  addVisit(val: any) {
    return this.http.post(this.APIUrl + '/visit/',val);
  }

  deleteVisit(id: number) {
    return this.http.delete(this.APIUrl + '/visit/' + id);
  }

  updateVisit(val: any) {
    return this.http.put(this.APIUrl + '/visit/',val);
  }

  addVisitsRegister(val: any) {
    return this.http.post(this.APIUrl + '/visits_register/',val);
  }

}
