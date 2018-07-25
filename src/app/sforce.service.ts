import { Injectable } from '@angular/core';
import { SforceDataService } from './sforce-data.service';
import { SforceOauthService } from './sforce-oauth.service';

@Injectable({
    providedIn: 'root'
})
export class SforceService {

    constructor (private sforceDataService: SforceDataService, private sforceOauthService: SforceOauthService) {
    }

    public login (): void {
        this.sforceOauthService.login();
    }
    public onOAuthCallback (urlParameters: string): Promise<void> {
        return this.sforceDataService.onOAuthCallback(urlParameters);
    }
    public isLoggedIn (): boolean {
        return this.sforceDataService.isLoggedIn();
    }
    public isCurrentUserAdmin (): boolean {
        return this.sforceDataService.isCurrentUserAdmin();
    }
    public getCurrentUserId (): string {
        return this.sforceDataService.getCurrentUserId();
    }
    public query (query: string): Promise<any> {
        return this.sforceDataService.query(query);
    }
    public deactivateUser (userId: string): Promise<any> {
        const user = {
            Id: userId,
            IsActive: false
        };
        return this.sforceDataService.update('User', user);
    }
}
