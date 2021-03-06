import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  userName = '';
  lieu = 'Ambohijatovo';
  isAdmin = false;
  date: any;

  pointages: any;

  //pour passer des données entre les composants.
  dateDailyPointage = '';
  employee_name = "";

  readonly APIUrl = "http://192.168.1.55:8000"

  //readonly APIUrl = 'http://localhost:8000';
  readonly PhotoUrl = this.APIUrl +  "/media/";

  constructor(private http: HttpClient) {}

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

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/save_file/',val);
  }

  getUsersList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/user/');
  }
  addUser(val : any) {
    return this.http.post(this.APIUrl + '/user/', val);
  }
  deleteUser(id : any) {
    return this.http.delete(this.APIUrl + '/user/' + id);
  }

  //liste des sécurité présent
  getActiveUsersList(val : any): Observable<any[]> {
    return this.http.put<any[]>(this.APIUrl + '/user/', val);
  }

  //Methode pour les employés
  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/employee/');
  }
  addEmployee(val: any) {
    return this.http.post(this.APIUrl + '/employee/', val);
  }
  updateEmployeeEntity(val: any) {
    return this.http.put(this.APIUrl + '/employee/', val);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.APIUrl + '/employee/' + id);
  }
  //modifer employee table lors d'un pointage
  putEmployee(val: any) {
    return this.http.put(this.APIUrl + '/pointageEmp/', val);
  }

  //Methode pour les directions
  getDepartmentList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/department/');
  }

  //Methode pour les lieux
  getLieuList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/lieu/');
  }
  putLieu(val: any) {
    return this.http.put(this.APIUrl + '/lieu/', val);
  }

  //Methode pour les stagiaires
  getStagiaireList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/stagiaire/');
  }
  addStagiaire(val: any) {
    return this.http.post(this.APIUrl + '/stagiaire/', val);
  }
  updateStagiaireEntity(val: any) {
    return this.http.put(this.APIUrl + '/stagiaire/', val);
  }
  deleteStagiaire(id : any) {
    return this.http.delete(this.APIUrl + '/stagiaire/' + id);
  }
  //modifer stagiaire table lors d'un pointage
  putStagiaire(val: any) {
    return this.http.put(this.APIUrl + '/pointageStg/', val);
  }

  //Methode pour les véhicules
  getVehiculeList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/vehicule/');
  }
  addVehicule(val: any) {
    return this.http.post(this.APIUrl + '/vehicule/', val);
  }
  updateVehiculeEntity(val: any) {
    return this.http.put(this.APIUrl + '/vehicule/', val);
  }
  deleteVehicule(id : any) {
    return this.http.delete(this.APIUrl + '/vehicule/' + id);
  }
  //Pour changer le pointed at
  putVehicule(val : any) {
    return this.http.put(this.APIUrl + '/pointageVehicule/', val);
  }
  //Methode pour les pointages
  getPointageList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/pointage/');
  }
  refreshPointageList() {
    this.getPointageList().subscribe((data) => {
      this.pointages = data;
    });
  }
  getPointageRegisterList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/pointage_register/');
  }
  //pour pointage employé
  addPointage(val: any) {
    return this.http.post(this.APIUrl + '/pointage/', val);
  }
  //pour pointage stagiaire
  addPointageStg(val: any) {
    return this.http.put(this.APIUrl + '/pointage/', val);
  }
  //pour pointage vehicule
  addPointageVehicule(val: any) {
    return this.http.post(this.APIUrl + '/pointageVehicule/', val);
  }

  //Pointage register
  addPointageRegister(val: any) {
    return this.http.post(this.APIUrl + '/pointage_register/', val);
  }
  deletePointage(id: any) {
    return this.http.delete(this.APIUrl + '/pointage/' + id);
  }
  //pointage register vehicule
  getVehiculePointage():  Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/pointageVehicule/');
  }


  //filtre des pointages par départements
  getPointageByDep(dep_id: number) {
    return this.http.delete(this.APIUrl + '/security/' + dep_id);
  }

  //methode pour les comptages
  //pour les visites
  getTabVisitCounting(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/visit_counter/');
  }
  getVisitCountingFilterByPlace(lieu_id: number): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/visit_counter/' + lieu_id);
  }
  getVisitByLieuAndDate(val: any) {
    return this.http.put(this.APIUrl + '/daily_pointage/', val);
  }
  //pour les pointages
  getTabPointageCounting(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/pointage_counter/');
  }
  getAllPointageByLieuAndDate(val: any) {
    return this.http.post(this.APIUrl + '/pointage_counter/', val);
  }
  getPointageByLieuAndDate(val: any) {
    return this.http.post(this.APIUrl + '/daily_pointage/', val);
  }
  getPointageCountingFilterByPlace(lieu_id: number): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/pointage_counter/' + lieu_id);
  }
  getLieu(lieu_id: number): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/lieu/' + lieu_id);
  }

  //Pour les sécurité actifs par lieu
  getActifSecurityByLieu(val: any): Observable<any[]> {
    return this.http.post<any[]>(this.APIUrl + '/security/', val);
  }
}
