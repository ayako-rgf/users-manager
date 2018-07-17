import { Injectable } from '@angular/core';
import OAuth from './forcejs/oauth';
import DataService from './forcejs/data-service';

@Injectable({
    providedIn: 'root'
})
export class SforceService {
    private forcejsDataService: any;

    constructor () { }

    public login (): void {
        const appId = '3MVG9Se4BnchkASnHuvTyYh3Kq8fpsLhxvnw20rMSBDRWTixsqiAzcTGobwRZcTGN5mZoG7vHDW3MB17gVAU8';
        const loginURL = 'https://test.salesforce.com';
        const oauthCallbackURL = 'http://localhost:4200/oauth';
        const oauth = OAuth.createInstance(appId, loginURL, oauthCallbackURL);
        oauth.login();
    }
    public createDataServiceInstance (oauthResultString: string): void {
        const oauthResultObject = this.getQueryStringAsObject(oauthResultString);
        const settings = this.getSettingsObjectToCreateDataServiceInstance(oauthResultObject);
        const options = {
            apiVersion: 'v36.0',
            loginURL: 'https://test.salesforce.com',
            proxyURL: 'https://ayako-cors-proxy.herokuapp.com/'
        };
        const service = DataService.createInstance(settings, options);

        service.query('select id, Name from contact LIMIT 5')
            .then(response => {
                console.log(response);
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
            appId: '3MVG9Se4BnchkASnHuvTyYh3Kq8fpsLhxvnw20rMSBDRWTixsqiAzcTGobwRZcTGN5mZoG7vHDW3MB17gVAU8',
            accessToken: oauthResult.access_token,
            instanceURL: oauthResult.instance_url,
            refreshToken: oauthResult.refresh_token,
            userId: oauthResult.id.split('/').pop()
        };
    }
}
