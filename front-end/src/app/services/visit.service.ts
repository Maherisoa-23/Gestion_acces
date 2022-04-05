import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  readonly APIUrl = "http://127.0.0.1:8000"

  constructor(private http: HttpClient) { }
  
  getVisitsList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/visit/');
  }

  addVisit(val: any) {
    return this.http.post(this.APIUrl + '/visit/',val);
  }

  updateVisit(val: any) {
    return this.http.put(this.APIUrl + '/visit/',val);
  }

}
