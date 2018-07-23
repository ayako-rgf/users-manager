import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { User } from '../user';
import { Request } from '../request';
import { RequestService } from '../request.service';
import { SforceService } from '../sforce.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    public user: User;

    constructor (private requestService: RequestService, private sforceService: SforceService, public snackBar: MatSnackBar) { }

    ngOnInit () {
        this.user = new User();
    }
    public add ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        const currentUserId = this.sforceService.getCurrentUserId();
        const request = {
            requesterUserId: currentUserId,
            subjectUserId: null,
            action: 'Create',
            newUser: {
                Name: this.user.Name,
                Email: this.user.Email
            }
        };
        this.requestService.addRequest(request as Request).subscribe(() => {
            const message = 'A new user "' + this.user.Name + '" requested.';
            console.log(message);
            this.openSnackBar(message);
        });
    }
    public openSnackBar (message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000
        });
    }
}
