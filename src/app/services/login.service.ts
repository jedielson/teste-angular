import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

import { LoginViewModel } from '../model/login-model';
import { TokenInfo } from '../model/token-info.model';

@Injectable()
export class LoginService {
    private url = environment.reducedUrl + '/connect/token';
    private headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    constructor(
        private http: Http
    ) { }

    Estalogado(): Promise<boolean> {
        const tokenInfo = this.GetTokenInfo();

        if (!tokenInfo) {
            return Promise.resolve(false);
        }

        if (tokenInfo.Expired) {
            return this.RefreshToken();
        }

        return Promise.resolve(true);
    }

    RefreshToken(): Promise<Boolean> {
        this.CleanLoginInfo();
        const body = this.BuildRefreshTokenBody();
        if (!body) { return Promise.resolve(false); }
        return this.http.post(this.url, body, { headers: this.headers })
            .toPromise()
            .then(res => {
                return this.ProcessResponse(this.ParseResponse(res));
            })
            .catch(this.HandleError);
    }

    ExecutarLogin(model: LoginViewModel): Promise<boolean> {
        this.CleanLoginInfo();
        return this.http.post(this.url, this.BuildLoginBody(model), { headers: this.headers })
            .toPromise()
            .then(res => {
                return this.ProcessResponse(this.ParseResponse(res));
            })
            .catch(this.HandleError);
    }

    private ParseResponse(res: Response): TokenInfo {
        const info = new TokenInfo();
        const body = res.json();
        info.AccessToken = body.access_token;
        info.ExpiresIn = body.expires_in;
        info.TokenType = body.token_type;
        info.RefreshToken = body.refresh_token;
        info.Expired = false;
        return info;
    }

    private ProcessResponse(info: TokenInfo): boolean {
        if (!info) { return false; }
        console.log('processing response');
        if (!info.Expired) {
            info.Expired = false;
        }
        this.StoreTokenInfo(info);
        console.log('scheduling at ' + new Date());
        this.ScheduleTokenExpiration(info);
        return true;
    }

    private HandleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private BuildLoginBody(model: LoginViewModel): URLSearchParams {

        const body = new URLSearchParams();
        body.set('username', model.username);
        body.set('password', model.password);
        body.set('grant_type', 'password');
        body.set('scope', 'offline_access');

        return body;
    }

    private BuildRefreshTokenBody(): URLSearchParams {
        const tokenInfo = this.GetTokenInfo();
        if (!tokenInfo) { return null; };
        const body = new URLSearchParams();
        body.set('refresh_token', tokenInfo.RefreshToken);
        body.set('grant_type', 'refresh_token');
        body.set('scope', 'offline_access');

        return body;
    }

    private StoreTokenInfo(info: TokenInfo): void {
        localStorage.setItem('token', JSON.stringify(info));
    }

    private ScheduleTokenExpiration(info: TokenInfo) {
        window.setTimeout(() => this.ExpireAccessToken(), info.ExpiresIn * 1000);
    }

    private GetTokenInfo(): TokenInfo {
        return JSON.parse(localStorage.getItem('token')) as TokenInfo;
    }

    private CleanLoginInfo(): void {
        localStorage.clear();
    }

    private ExpireAccessToken(): void {
        console.log('token expired...');
        console.log('expiring at ' + new Date());
        const info = this.GetTokenInfo();
        info.Expired = true;
        this.StoreTokenInfo(info);

    }
}
