import { Injectable } from '@angular/core';
import OAuth from './forcejs/oauth';
import DataService from './forcejs/data-service';

@Injectable({
    providedIn: 'root'
})
export class SforceService {

    constructor () { }

    public login (): void {
        const appId = '3MVG9Se4BnchkASnHuvTyYh3Kq8fpsLhxvnw20rMSBDRWTixsqiAzcTGobwRZcTGN5mZoG7vHDW3MB17gVAU8';
        const loginURL = 'https://test.salesforce.com';
        const oauthCallbackURL = 'http://localhost:4200/oauth';
        const oauth = OAuth.createInstance(appId, loginURL, oauthCallbackURL);
        oauth.login();
    }
}
