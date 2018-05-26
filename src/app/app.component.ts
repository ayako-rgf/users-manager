import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    navLinks = [{
        label: 'Dashboard',
        link: '/dashboard'
    }, {
        label: 'All Beers',
        link: '/beers'
    }, {
        label: 'Add New',
        link: '/add-beer'
    }];
}
