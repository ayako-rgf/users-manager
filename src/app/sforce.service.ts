import { Injectable } from '@angular/core';
import OAuth from './forcejs/oauth';
import DataService from './forcejs/data-service';

@Injectable({
    providedIn: 'root'
})
export class SforceService {
    private isSignedIn: boolean;
    private isSignedInAsAdmin: boolean;
    private forcejsDataService: any;

    constructor () {
        this.isSignedIn = false;
    }

    public isLoggedIn (): boolean {
        return this.isSignedIn;
    }
    public isCurrentUserAdmin (): boolean {
        return this.isSignedInAsAdmin;
    }
    public login (): void {
        const appId = '3MVG9Se4BnchkASnHuvTyYh3Kq8fpsLhxvnw20rMSBDRWTixsqiAzcTGobwRZcTGN5mZoG7vHDW3MB17gVAU8';
        const loginURL = 'https://test.salesforce.com';
        const oauthCallbackURL = 'http://localhost:4200/oauth';
        const oauth = OAuth.createInstance(appId, loginURL, oauthCallbackURL);
        oauth.login();
    }
    private getProfileOfUser (userId: string): Promise<string> {
        const query = 'SELECT Profile.Name FROM User WHERE Id = \'' + userId + '\'';
        return this.query(query).then((result: any) => {
            return result.records[0].Profile.Name;
        });
    }
    public createDataServiceInstance (oauthResultString: string): void {
        this.isSignedIn = true;
        const oauthResultObject = this.getQueryStringAsObject(oauthResultString);
        const settings = this.getSettingsObjectToCreateDataServiceInstance(oauthResultObject);
        const options = {
            apiVersion: 'v36.0',
            loginURL: 'https://test.salesforce.com',
            proxyURL: 'https://ayako-cors-proxy.herokuapp.com/'
        };
        this.forcejsDataService = DataService.createInstance(settings, options);
        this.getProfileOfUser(settings.userId).then((profile: string) => {
            this.isSignedInAsAdmin = (profile === 'System Administrator');
        });
    }
    public query (query: string): Promise<any> {
        return this.forcejsDataService.query(query);
    }
    private getQueryStringAsObject (fragment: string): any {
        const obj = {};
        const params = fragment.split('&');
        params.forEach(param => {
            const splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    }
    private getSettingsObjectToCreateDataServiceInstance (oauthResult: any): any {
        return {
            appId: '3MVG9Se4BnchkASnHuvTyYh3Kq8fpsLhxvnw20rMSBDRWTixsqiAzcTGobwRZcTGN5mZoG7vHDW3MB17gVAU8',
            accessToken: oauthResult.access_token,
            instanceURL: oauthResult.instance_url,
            refreshToken: oauthResult.refresh_token,
            userId: oauthResult.id.split('/').pop()
        };
    }
}
