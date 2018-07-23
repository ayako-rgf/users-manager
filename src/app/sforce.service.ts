import { Injectable } from '@angular/core';
import OAuth from '../lib/forcejs/oauth';
import DataService from '../lib/forcejs/data-service';

@Injectable({
    providedIn: 'root'
})
export class SforceService {
    private isSignedIn: boolean;
    private isSignedInAsAdmin: boolean;
    private currentUserId: string;
    private forcejsDataService: any;
    private readonly appId: string = '3MVG9Se4BnchkASnHuvTyYh3Kq8fpsLhxvnw20rMSBDRWTixsqiAzcTGobwRZcTGN5mZoG7vHDW3MB17gVAU8';
    private readonly loginURL: string = 'https://test.salesforce.com';

    constructor () {
        this.isSignedIn = false;
    }

    public isLoggedIn (): boolean {
        return this.isSignedIn;
    }
    public isCurrentUserAdmin (): boolean {
        return this.isSignedInAsAdmin;
    }
    public getCurrentUserId (): string {
        return this.currentUserId;
    }
    public login (): void {
        const oauthCallbackURL = 'http://localhost:4200/oauth';
        const oauth = OAuth.createInstance(this.appId, this.loginURL, oauthCallbackURL);
        oauth.login();
    }
    public createDataServiceInstance (oauthResultString: string): void {
        this.isSignedIn = true;
        const oauthResultObject = this.getQueryStringAsObject(oauthResultString);
        const settings = this.getSettingsObjectToCreateDataServiceInstance(oauthResultObject);
        const options = {
            loginURL: this.loginURL,
            useProxy: false
        };
        this.forcejsDataService = DataService.createInstance(settings, options);
        this.currentUserId = settings.userId;
        this.getProfileOfUser(this.currentUserId).then((profile: string) => {
            this.isSignedInAsAdmin = (profile === 'System Administrator');
        });
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
            appId: this.appId,
            accessToken: oauthResult.access_token,
            instanceURL: oauthResult.instance_url,
            refreshToken: oauthResult.refresh_token,
            userId: oauthResult.id.split('/').pop()
        };
    }
    private getProfileOfUser (userId: string): Promise<string> {
        const query = 'SELECT Profile.Name FROM User WHERE Id = \'' + userId + '\'';
        return this.query(query).then((result: any) => {
            return result.records[0].Profile.Name;
        });
    }
    public query (query: string): Promise<any> {
        return this.forcejsDataService.query(query);
    }
    public deactivateUser (userId: string): Promise<any> {
        const user = {
            Id: userId,
            IsActive: false
        };
        return this.forcejsDataService.update('User', user);
    }
}
