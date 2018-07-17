import { Component, OnInit } from '@angular/core';
import { SforceService } from '../sforce.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor (private sforceService: SforceService) { }

    ngOnInit () {
        this.sforceService.login();
    }
}
