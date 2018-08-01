import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { RequestService } from '../request.service';
import { SforceService } from '../sforce.service';
import { User, Request } from '../types';
import { DatatableComponent } from '../datatable/datatable.component';
import { Column } from '../datatable/datatabe-types';
import { forkJoin } from 'rxjs';

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public users: User[];
    public columnDefinitions: Column[];
    @ViewChild(DatatableComponent) datatable: DatatableComponent<User>;

    constructor (private requestService: RequestService, private snackBar: MatSnackBar, private sforceService: SforceService) {
    }

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
        }, {
            headerLabel: 'Deactivation Request Pending',
            fieldName: 'requestPending',
        }];
    }
    public getUsers (): void {
        this.sforceService.query('SELECT Id, Name, Email, IsActive FROM User ORDER BY LastModifiedDate DESC')
            .then((result: any) => {
                this.users = result.records;
                this.refreshRequestPendingFlags(this.users);
            });
    }
    private refreshRequestPendingFlags (users: User[]): void {
        this.requestService.getRequests()
            .subscribe((requests: Request[]) => {
                const requestPendingUserIds = this.getDeactivationRequestPendingUserIds(requests);
                users.forEach((user: User) => {
                    user['requestPending'] = requestPendingUserIds.includes(user.Id);
                });
            });
    }
    private getDeactivationRequestPendingUserIds (requests: Request[]): string[] {
        return requests
            .filter((request: Request) => request.status === 'Pending' && request.action === 'Deactivate')
            .map((request: Request) => request.subjectUserId);
    }
    public processSelectedUsers ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        const selectedUsers = this.datatable.getSelected();
        if (selectedUsers.length === 0) {
            return;
        }
        const selectedActiveUsers = selectedUsers.filter((user: User) => user.IsActive && !user['requestPending']);
        if (selectedActiveUsers.length === 0) {
            this.snackBar.open('Selected users are already inactive or request pending.');
            return;
        }
        this.submitDeactivationRequest(selectedActiveUsers);
    }
    private submitDeactivationRequest (activeUsers: User[]): void {
        const requests = this.buildDeactivationRequests(activeUsers);
        const observables = requests.map((request: Request) => this.requestService.addRequest(request));
        forkJoin(observables).subscribe(() => {
            this.refreshRequestPendingFlags(this.users);
            this.datatable.clearSelected();
            this.snackBar.open('Request(s) sent.');
        });
    }
    private buildDeactivationRequests (users: User[]): Request[] {
        const currentUserId = this.sforceService.getCurrentUserId();
        return users.map((user: User) => {
            return {
                requesterUserId: currentUserId,
                subjectUserId: user.Id,
                action: 'Deactivate'
            } as Request;
        });
    }
}
