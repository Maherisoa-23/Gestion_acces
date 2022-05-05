import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitDashboardComponent } from './visit-dashboard/visit-dashboard.component';
import { ListActiveVisitComponent } from './visit-dashboard/list-active-visit/list-active-visit.component';
import { VisitComponent } from './visit-dashboard/list-active-visit/visit/visit.component';
import { NavBarComponent } from './visit-dashboard/nav-bar/nav-bar.component';
import { SideBarComponent } from './visit-dashboard/side-bar/side-bar.component';

import { AddVisitComponent } from './visit-dashboard/list-active-visit/add-visit/add-visit.component';

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

const appRoutes: Routes = [
  { path: 'admin', canActivate: [AdminGuard], component: AdminDashboardComponent,
    children: [
      { path: '', component: AccueilComponent },
      { path: 'visit-admin', component: ListVisitAdminComponent},
      { path: 'pointage-admin', component: PointageComponent},
    ]
  },
  { path: 'accueil', canActivate: [AuthGuard], component: VisitDashboardComponent,
    children: [
      { path: '', component: PointageEmployeeComponent },
      { path: 'visit-active', component: ListActiveVisitComponent},
      { path: 'pointage', component: PointageEmployeeComponent},
    ]
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
    VisitComponent,
    NavBarComponent,
    SideBarComponent,
    AddVisitComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [VisitService, AuthService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
