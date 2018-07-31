import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { RequestService } from '../request.service';
import { User } from '../user';
import { Request } from '../request';
import { SforceService } from '../sforce.service';
import { DatatableComponent } from '../datatable/datatable.component';
import { forkJoin } from 'rxjs';

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public users: User[];
    public columnDefinitions: any[];
    @ViewChild(DatatableComponent) datatable: DatatableComponent<User>;

    constructor (private requestService: RequestService, private snackBar: MatSnackBar, private sforceService: SforceService) { }

    ngOnInit () {
        this.getUsers();
        this.columnDefinitions = [{
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
        this.sforceService.query('SELECT Id, Name, Email, IsActive FROM User ORDER BY LastModifiedDate DESC')
            .then((result: any) => {
                this.users = result.records;
            });
    }
    public requestDeactivation ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        const requests = this.buildRequests(this.datatable.getSelected(), 'Deactivate');
        const observables = requests.map((request: Request) => this.requestService.addRequest(request));
        forkJoin(observables).subscribe(() => {
            this.datatable.clearSelected();
            this.openSnackBar('Request(s) sent.');
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
    private openSnackBar (message: string): void {
        this.snackBar.open(message, null, {
            duration: 4000
        });
    }
}
