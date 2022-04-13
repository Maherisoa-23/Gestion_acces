import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isAuth = false;
  userName = ""

  readonly APIUrl = "http://192.168.1.253:8888"

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

  getUsersList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/user/');
  }
}
