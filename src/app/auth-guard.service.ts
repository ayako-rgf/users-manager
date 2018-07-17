import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public canActivate (): boolean {
        console.log('canActivate');
        return true;
    }
}
