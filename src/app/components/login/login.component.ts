import { Component } from '@angular/core';

import { LoginViewModel } from '../../model/login-model';

@Component({
    selector: 'app-login'
})

export class LoginComponent {
    loginViewModel: LoginViewModel = new LoginViewModel();

    save(): void {
        console.log('clicou');
    }
}
