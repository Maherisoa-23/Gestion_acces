import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isAuth = false;
  userName = "";
  lieu = "Ambohijatovo";
  isAdmin = false;
  date : any;
  userLoginTime : any;
  numero_matricule : any;

  //readonly APIUrl = "http://192.168.10.107:8000"
  readonly APIUrl = "http://localhost:8000"
  

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

  //Methode pour les employés

  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/employee/');
  }

  getEmployeeListByDep(dep_id :number): Observable<any[]> {
    return this.http.delete<any[]>(this.APIUrl + '/employee/' + dep_id);
  }

  putEmployee(val : any){
    return this.http.put(this.APIUrl + '/employee/',val);
  }

  getDepartmentList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/department/');
  }

  getLieuList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/lieu/');
  }

  putLieu (val: any) {
    return this.http.put(this.APIUrl + '/lieu/',val);
  }

  //Methode pour les pointages

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
  //filtre des pointages par départements
  getPointageByDep(dep_id: number){
    return this.http.delete(this.APIUrl + '/security/' + dep_id);
  }

  //methode pour la gestion des connections
  getActiveConnectionList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/active_connection/');
  }

  addActiveConnection(val: any) {
    return this.http.post(this.APIUrl + '/active_connection/',val);
  }

  putActiveConnection(val: any) {
    return this.http.put(this.APIUrl + '/active_connection/',val);
  }
  deleteActiveConnection(lieu_id: number) {
    return this.http.delete(this.APIUrl + '/active_connection/' + lieu_id);
  }

  addConnectionRegister(val: any) {
    return this.http.post(this.APIUrl + '/connection_register/',val);
  }

  //methode pour les comptages
  //pour les visites
  getTabVisitCounting(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/visit_counter/');
  }
  getVisitCountingFilterByPlace(lieu_id: number): Observable<any>{
    return this.http.delete<any>(this.APIUrl + '/visit_counter/' + lieu_id);
  }
  //pour les pointages
  getPointageByLieuAndDate(val : any){
    return this.http.post(this.APIUrl + '/pointage_counter/', val);
  }
  getPointageCountingFilterByPlace(lieu_id: number): Observable<any>{
    return this.http.delete<any>(this.APIUrl + '/pointage_counter/' + lieu_id);
  }
  getLieu(lieu_id : number): Observable<any>{
    return this.http.delete<any>(this.APIUrl + '/lieu/' + lieu_id);
  }
}
