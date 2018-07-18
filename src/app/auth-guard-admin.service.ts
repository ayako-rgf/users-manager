import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SforceService } from './sforce.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

    constructor (private sforceService: SforceService) { }

    public canActivate (): boolean {
        if (this.sforceService.isLoggedIn()) {
            if (this.sforceService.isCurrentUserAdmin()) {
                return true;
            } else {
                return false;
            }
        } else {
            this.sforceService.login();
            return false;
        }
    }
}
