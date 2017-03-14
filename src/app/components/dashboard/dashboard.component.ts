import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent {

    title = 'app works!';

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }
}
