import { Component } from '@angular/core';

import { LoginViewModel } from '../../model/login-model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    loginViewModel: LoginViewModel = new LoginViewModel();

    save(): void {
        console.log('clicou');
    }
}
