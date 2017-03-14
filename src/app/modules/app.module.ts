import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthorizeGuard } from '../guards/authorize.guard';
import { LoginService } from '../services/login.service';

import { AppComponent } from '../components/app/app.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ColaboradoresComponent } from '../components/colaboradores/colaboradores.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ColaboradoresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    AuthorizeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
