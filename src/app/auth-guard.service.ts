import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SforceService } from './sforce.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor (private sforceService: SforceService) { }

    public canActivate (): boolean {
        if (this.sforceService.isLoggedIn()) {
            return true;
        }
        this.sforceService.login();
        return false;
    }
}
