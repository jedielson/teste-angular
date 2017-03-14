import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { LoginService } from '../../services/login.service';

import { LoginViewModel } from '../../model/login-model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    loginViewModel: LoginViewModel = new LoginViewModel();

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    login(): void {
        this.loginService.ExecutarLogin(this.loginViewModel)
            .then(x => {
                if(x){
                    this.router.navigate(['/dashboard']);
                    return;
                }
                alert('Não foi possível executar o login');
            })
            .catch(x => console.error(x));
    }
}
