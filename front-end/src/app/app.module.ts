import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitDashboardComponent } from './visit-dashboard/visit-dashboard.component';
import { ListActiveVisitComponent } from './visit-dashboard/list-active-visit/list-active-visit.component';
import { VisitComponent } from './visit-dashboard/list-active-visit/visit/visit.component';

@NgModule({
  declarations: [
    AppComponent,
    VisitDashboardComponent,
    ListActiveVisitComponent,
    VisitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
