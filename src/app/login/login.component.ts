import { Component, OnInit } from '@angular/core';
import OAuth from '../forcejs/oauth';
import DataService from '../forcejs/data-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        const appId = '3MVG9Se4BnchkASnHuvTyYh3Kq8fpsLhxvnw20rMSBDRWTixsqiAzcTGobwRZcTGN5mZoG7vHDW3MB17gVAU8';
        const loginURL = 'https://test.salesforce.com';
        const oauthCallbackURL = 'http://localhost:4200/users';
        const oauth = OAuth.createInstance(appId, loginURL, oauthCallbackURL);
        oauth.login().then((oauthResult) => {
            console.log(oauthResult);
            DataService.createInstance(oauthResult);
            this.loadContacts();
        });

    }

    private loadContacts(): void {
        console.log('loadContacts()');
        const service = DataService.getInstance();
        service.query('select id, Name from contact LIMIT 50')
            .then(response => {
                console.log(response);
            });
    }

}
