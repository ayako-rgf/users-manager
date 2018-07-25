import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SforceService } from '../sforce.service';

@Component({
    template: ''
})
export class OauthComponent implements OnInit {

    constructor (private activatedRoute: ActivatedRoute, private router: Router, private sforceService: SforceService) { }

    ngOnInit () {
        this.sforceService.onOAuthCallback(this.activatedRoute.snapshot.fragment)
            .then(() => this.router.navigateByUrl('/users'));
    }
}
