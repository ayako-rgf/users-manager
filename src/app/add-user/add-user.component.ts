import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { User } from '../user';
import { Request } from '../request';
import { BeerService } from '../beer.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    public user: User;

    constructor (private beerService: BeerService, public snackBar: MatSnackBar) { }

    ngOnInit () {
        this.user = new User();
    }
    public add ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.beerService.addUser(this.user as User)
            .subscribe((user: User) => {
                const request = {
                    requesterUserId: 103, //FIXME!
                    subjectUserId: user.id
                };
                this.beerService.addRequest(request as Request).subscribe(() => {
                    const message = 'A new user "' + user.name + '" requested.';
                    console.log(message);
                    this.openSnackBar(message);
                });
            });
    }
    public openSnackBar (message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000
        });
    }
}
