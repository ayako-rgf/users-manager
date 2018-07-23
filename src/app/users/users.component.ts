import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BeerService } from '../beer.service';
import { User } from '../user';
import { Request } from '../request';
import { SforceService } from '../sforce.service';
import { DatatableComponent } from '../datatable/datatable.component';

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public users: User[];
    public columnDefinitions: any[];
    @ViewChild(DatatableComponent) selection: DatatableComponent<User>;

    constructor (private beerService: BeerService, public snackBar: MatSnackBar, private sforceService: SforceService) { }

    ngOnInit () {
        this.getUsers();
        this.columnDefinitions = [{
            headerLabel: 'Id',
            fieldName: 'Id',
        }, {
            headerLabel: 'Name',
            fieldName: 'Name',
        }, {
            headerLabel: 'Email',
            fieldName: 'Email',
        }, {
            headerLabel: 'IsActive',
            fieldName: 'IsActive',
        }];
    }
    public getUsers (): void {
        this.sforceService.query('SELECT Id, Name, Email, IsActive FROM User ORDER BY LastModifiedDate DESC LIMIT 5')
            .then((result: any) => {
                this.users = result.records;
            });
    }
    public requestDeactivation ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        const requests = this.buildRequests(this.selection.getSelected(), 'Deactivate');
        requests.forEach((request: Request) => {
            this.beerService.addRequest(request as Request).subscribe(() => {
                const message = 'Request sent.';
                console.log(message);
                this.openSnackBar(message);
            });
        });
    }
    private buildRequests (users: User[], action: string): Request[] {
        const currentUserId = this.sforceService.getCurrentUserId();
        return users.map((user: User) => {
            return {
                requesterUserId: currentUserId,
                subjectUserId: user.Id,
                action: action
            } as Request;
        });
    }
    public openSnackBar (message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000
        });
    }
}
