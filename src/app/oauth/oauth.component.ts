import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SforceService } from '../sforce.service';

@Component({
    selector: 'app-oauth',
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

    constructor(private route: ActivatedRoute, private sforceService: SforceService) { }

    ngOnInit() {
        this.sforceService.createDataServiceInstance(this.route.snapshot.fragment);
    }
}
