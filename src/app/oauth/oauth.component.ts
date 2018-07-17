import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SforceService } from '../sforce.service';

@Component({
    selector: 'app-oauth',
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

    constructor (private activatedRoute: ActivatedRoute, private router: Router, private sforceService: SforceService) { }

    ngOnInit () {
        this.sforceService.createDataServiceInstance(this.activatedRoute.snapshot.fragment);
        this.router.navigateByUrl('/users');
    }
}
