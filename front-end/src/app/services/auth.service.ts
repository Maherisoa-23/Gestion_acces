import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isAuth = false;
  userName = ""
  lieu = "";
  isAdmin = false;

  readonly APIUrl = "http://127.0.0.1:8000"

  constructor(private http: HttpClient) { }

  signIn() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isAuth = true;
        resolve(true);
      }, 500);
    });
  }

  signOut() {
    this.isAuth = false;
  }

  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/employee/');
  }

  getDepartmentList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/department/');
  }

  getPointageList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/pointage/');
  }

  getPointageRegisterList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/pointage_register/');
  }

  addPointage(val: any) {
    return this.http.post(this.APIUrl + '/pointage/',val);
  }

  addPointageRegister(val: any) {
    return this.http.post(this.APIUrl + '/pointage_register/',val);
  }

  deletePointage(id: number) {
    return this.http.delete(this.APIUrl + '/pointage/' + id);
  }

  deleteVisit(id: number) {
    return this.http.delete(this.APIUrl + '/visit/' + id);
  }

  updateVisit(val: any) {
    return this.http.put(this.APIUrl + '/visit/',val);
  }
}
