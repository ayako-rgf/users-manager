import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public navLinks = [{
        label: 'Users',
        link: '/users'
    }, {
        label: 'Add User',
        link: '/add-user'
    }, {
        label: 'Requests',
        link: '/requests'
    }];
}
