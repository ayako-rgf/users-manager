import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import DataService from '../forcejs/data-service';

@Component({
    selector: 'app-oauth',
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        const fragment = this.route.snapshot.fragment;
        const oauthResult = this.getQueryStringAsObject(fragment);
        console.log(oauthResult);
        const settings = this.getSettingsObjectToCreateDataServiceInstance(oauthResult);
        console.log(settings);
        const options = {
            apiVersion: 'v36.0',
            loginURL: 'https://test.salesforce.com',
            proxyURL: 'https://dev-cors-proxy.herokuapp.com/'
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
