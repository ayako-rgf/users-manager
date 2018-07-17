import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SforceService } from './sforce.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor (private sforceService: SforceService) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }
    private checkLogin (url: string): boolean {
        if (this.sforceService.isLoggedIn()) {
            return true;
        }
        this.sforceService.login();
        return false;
    }
}
