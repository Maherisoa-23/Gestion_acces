import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitDashboardComponent } from './visit-dashboard/visit-dashboard.component';
import { ListActiveVisitComponent } from './visit-dashboard/list-active-visit/list-active-visit.component';
import { NavBarComponent } from './visit-dashboard/nav-bar/nav-bar.component';
import { SideBarComponent } from './visit-dashboard/side-bar/side-bar.component';

import { VisitService } from './services/visit.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationComponent } from './authentification/authentification.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './services/auth-guard.service';
import { ListVisitAdminComponent } from './admin-dashboard/visite/list-visit-admin/list-visit-admin.component';
import { PointageEmployeeComponent } from './visit-dashboard/pointage-employee/pointage-employee.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavBarAComponent } from './admin-dashboard/nav-bar-a/nav-bar-a.component';
import { SideBarAComponent } from './admin-dashboard/side-bar-a/side-bar-a.component';
import { PointageComponent } from './admin-dashboard/pointage/pointage-actif/pointage.component';
import { AccueilComponent } from './admin-dashboard/accueil/accueil.component';
import { AdminGuard } from './services/admin-guard.service';
import { ChartGeneraleComponent } from './admin-dashboard/accueil/chart-generale/chart-generale.component';
import { LieuCardComponent } from './admin-dashboard/accueil/lieu-card/lieu-card.component';
import { PointageRegisterComponent } from './admin-dashboard/pointage/pointage-register/pointage-register.component';
import { VisitRegisterComponent } from './admin-dashboard/visite/visit-register/visit-register.component';
import { SecurityAgentComponent } from './admin-dashboard/security-agent/security-agent.component';
import { UserAccueilComponent } from './visit-dashboard/user-accueil/user-accueil.component';
import { DataTablesModule } from 'angular-datatables';

//animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// code format
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { UniquePointageComponent } from './admin-dashboard/pointage/unique-pointage/unique-pointage.component';
import { ClockingScheduleComponent } from './admin-dashboard/clocking-schedule/clocking-schedule.component';

//pour le calendrier
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LieuDetailsComponent } from './admin-dashboard/accueil/lieu-details/lieu-details.component';
import { EmployeeComponent } from './admin-dashboard/employee/employee.component';
import { VisiteurComponent } from './admin-dashboard/visite/visiteur/visiteur.component';
import { VisiteurProfileComponent } from './admin-dashboard/visite/visiteur/visiteur-profile/visiteur-profile.component';
import { StagiaireActifComponent } from './admin-dashboard/stagiaire/stagiaire-actif/stagiaire-actif.component';
import { StagiaireRegisterComponent } from './admin-dashboard/stagiaire/stagiaire-register/stagiaire-register.component';
import { StagiaireListComponent } from './admin-dashboard/stagiaire/stagiaire-list/stagiaire-list.component';
import { StagiaireProfileComponent } from './admin-dashboard/stagiaire/stagiaire-list/stagiaire-profile/stagiaire-profile.component';
import { EmployeeProfileComponent } from './admin-dashboard/employee/employee-profile/employee-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendrierVisiteComponent } from './admin-dashboard/visite/visiteur/visiteur-profile/calendrier-visite/calendrier-visite.component';
import { VehiculeComponent } from './admin-dashboard/vehicule/vehicule.component';
import { VehiculeRegisterComponent } from './admin-dashboard/vehicule/vehicule-register/vehicule-register.component';
import { VehiculeProfileComponent } from './admin-dashboard/vehicule/vehicule-profile/vehicule-profile.component';
import { VisitDetailsComponent } from './admin-dashboard/visite/visit-details/visit-details.component';

registerLocaleData(localeFr, 'fr');

FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin]);

const appRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AccueilComponent },
      { path: 'employee-list', component: EmployeeComponent },
      { path: 'employee-profile', component: EmployeeProfileComponent },
      { path: 'visiteur-list', component: VisiteurComponent },
      { path: 'visiteur-profile', component: VisiteurProfileComponent },
      { path: 'visit-details', component: VisitDetailsComponent },
      { path: 'security-agent', component: SecurityAgentComponent },
      { path: 'visit-admin', component: ListVisitAdminComponent },
      { path: 'visit-register', component: VisitRegisterComponent },
      { path: 'pointage-admin', component: PointageComponent },
      { path: 'pointage-register', component: PointageRegisterComponent },
      { path: 'lieu-details', component: LieuDetailsComponent },
      { path: 'unique-pointage', component: UniquePointageComponent },
      { path: 'stagiaire-admin', component: StagiaireActifComponent },
      { path: 'stagiaire-register', component: StagiaireRegisterComponent },
      { path: 'stagiaire-list', component: StagiaireListComponent },
      { path: 'stagiaire-profile', component: StagiaireProfileComponent },
      { path: 'vehicule-list', component: VehiculeComponent },
      { path: 'vehicule-register', component: VehiculeRegisterComponent },
      { path: 'vehicule-profile', component: VehiculeProfileComponent },
    ],
  },
  {
    path: 'agent',
    canActivate: [AuthGuard],
    component: VisitDashboardComponent,
    children: [
      { path: 'accueil', component: UserAccueilComponent },
      { path: 'visit-active', component: ListActiveVisitComponent },
      { path: 'pointage', component: PointageEmployeeComponent },
    ],
  },
  { path: 'authentification', component: AuthentificationComponent },
  { path: '', component: AuthentificationComponent },
  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    VisitDashboardComponent,
    ListActiveVisitComponent,
    NavBarComponent,
    SideBarComponent,
    AuthentificationComponent,
    ErrorComponent,
    ListVisitAdminComponent,
    PointageEmployeeComponent,
    AdminDashboardComponent,
    NavBarAComponent,
    SideBarAComponent,
    PointageComponent,
    AccueilComponent,
    ChartGeneraleComponent,
    LieuCardComponent,
    PointageRegisterComponent,
    VisitRegisterComponent,
    SecurityAgentComponent,
    UserAccueilComponent,
    UniquePointageComponent,
    ClockingScheduleComponent,
    LieuDetailsComponent,
    EmployeeComponent,
    VisiteurComponent,
    VisiteurProfileComponent,
    StagiaireActifComponent,
    StagiaireRegisterComponent,
    StagiaireListComponent,
    StagiaireProfileComponent,
    EmployeeProfileComponent,
    CalendrierVisiteComponent,
    VehiculeComponent,
    VehiculeRegisterComponent,
    VehiculeProfileComponent,
    VisitDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgToastModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    VisitService,
    AuthService,
    AuthGuard,
    AdminGuard,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
