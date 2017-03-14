import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthorizeGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {

        this.loginService.Estalogado()
            .then(x => {
                if (!x) {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
            .catch(x => console.error(x));

        return true;
    }
}
