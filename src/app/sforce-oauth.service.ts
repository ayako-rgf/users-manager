import { Injectable } from '@angular/core';
import OAuth from '../lib/forcejs/oauth';
import { sforceSettings } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SforceOauthService {

    public login (): void {
        const oauth = OAuth.createInstance(sforceSettings.appId, sforceSettings.loginURL, sforceSettings.oauthCallbackURL);
        oauth.login();
    }
}
