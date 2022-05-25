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
import { ListVisitAdminComponent } from './admin-dashboard/list-visit-admin/list-visit-admin.component';
import { PointageEmployeeComponent } from './visit-dashboard/pointage-employee/pointage-employee.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavBarAComponent } from './admin-dashboard/nav-bar-a/nav-bar-a.component';
import { SideBarAComponent } from './admin-dashboard/side-bar-a/side-bar-a.component';
import { PointageComponent } from './admin-dashboard/pointage/pointage.component';
import { AccueilComponent } from './admin-dashboard/accueil/accueil.component';
import { AdminGuard } from './services/admin-guard.service';
import { ChartGeneraleComponent } from './admin-dashboard/accueil/chart-generale/chart-generale.component';
import { LieuCardComponent } from './admin-dashboard/accueil/lieu-card/lieu-card.component';
import { PointageRegisterComponent } from './admin-dashboard/pointage-register/pointage-register.component';
import { SecurityProfileComponent } from './admin-dashboard/security-profile/security-profile.component';
import { VisitRegisterComponent } from './admin-dashboard/visit-register/visit-register.component';
import { SecurityAgentComponent } from './admin-dashboard/security-agent/security-agent.component';
import { UserAccueilComponent } from './visit-dashboard/user-accueil/user-accueil.component';
import { DataTablesModule } from 'angular-datatables';

//animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// code format
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { LOCALE_ID } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { UniquePointageComponent } from './admin-dashboard/unique-pointage/unique-pointage.component';
import { ClockingScheduleComponent } from './admin-dashboard/security-profile/clocking-schedule/clocking-schedule.component';

//pour le calendrier
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LieuDetailsComponent } from './admin-dashboard/lieu-details/lieu-details.component';
import { EmployeeComponent } from './admin-dashboard/employee/employee.component';

FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin]);

const appRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AccueilComponent },
      { path: 'Employee-list', component: EmployeeComponent },
      { path: 'security-agent', component: SecurityAgentComponent },
      { path: 'security-profile', component: SecurityProfileComponent },
      { path: 'visit-admin', component: ListVisitAdminComponent },
      { path: 'visit-register', component: VisitRegisterComponent },
      { path: 'pointage-admin', component: PointageComponent },
      { path: 'pointage-register', component: PointageRegisterComponent },
      { path: 'lieu-details', component: LieuDetailsComponent },
      { path: 'unique-pointage', component: UniquePointageComponent },
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
    SecurityProfileComponent,
    VisitRegisterComponent,
    SecurityAgentComponent,
    UserAccueilComponent,
    UniquePointageComponent,
    ClockingScheduleComponent,
    LieuDetailsComponent,
    EmployeeComponent,
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
