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
import { AccueilComponent } from './accueil/accueil.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'authenetification', component: AuthentificationComponent },
  { path: '', component: AuthentificationComponent },
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
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [VisitService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
