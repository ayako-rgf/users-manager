import { Injectable } from '@angular/core';
import DataService from '../lib/forcejs/data-service';
import { sforceSettings } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SforceDataService {
    private isSignedInAsAdmin: boolean;
    private forcejsDataService: any;

    public isLoggedIn (): boolean {
        return !!this.forcejsDataService;
    }
    public isCurrentUserAdmin (): boolean {
        return this.isSignedInAsAdmin;
    }
    public getCurrentUserId (): string {
        return this.forcejsDataService.getUserId();
    }
    public onOAuthCallback (urlParameters: string): Promise<void> {
        this.forcejsDataService = this.createDataServiceInstance(urlParameters);
        return this.getProfileOfCurrentUser().then((currentUserProfile: string) => {
            this.isSignedInAsAdmin = (currentUserProfile === 'System Administrator');
        });
    }
    public query (query: string): Promise<any> {
        return this.forcejsDataService.query(query);
    }
    public update (objectName: string, data: any): Promise<any> {
        return this.forcejsDataService.update(objectName, data);
    }
    private createDataServiceInstance (urlParameters: string): any {
        const oauth = this.parseParameters(urlParameters);
        const options = {
            loginURL: sforceSettings.loginURL,
            useProxy: false
        };
        return DataService.createInstance(oauth, options);
    }
    private parseParameters (fragment: string): any {
        const parametersObject = this.getParametersAsObject(fragment);
        return this.getOauthObjectToCreateDataServiceInstance(parametersObject);
    }
    private getParametersAsObject (fragment: string): any {
        const obj = {};
        const params = fragment.split('&');
        params.forEach(param => {
            const splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    }
    private getOauthObjectToCreateDataServiceInstance (oauthResult: any): any {
        return {
            appId: sforceSettings.appId,
            accessToken: oauthResult.access_token,
            instanceURL: oauthResult.instance_url,
            refreshToken: oauthResult.refresh_token,
            userId: oauthResult.id.split('/').pop()
        };
    }
    private getProfileOfCurrentUser (): Promise<string> {
        const currentUserId = this.getCurrentUserId();
        const query = 'SELECT Profile.Name FROM User WHERE Id = \'' + currentUserId + '\'';
        return this.query(query).then((result: any) => {
            return result.records[0].Profile.Name;
        });
    }
}
