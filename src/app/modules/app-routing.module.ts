import { AuthorizeGuard } from '../guards/authorize.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { AppComponent } from '../components/app/app.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ColaboradoresComponent } from '../components/colaboradores/colaboradores.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthorizeGuard] },
    { path: 'home', component: AppComponent, canActivate: [AuthorizeGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizeGuard] },
    { path: 'colaboradores', component: ColaboradoresComponent, canActivate: [AuthorizeGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
