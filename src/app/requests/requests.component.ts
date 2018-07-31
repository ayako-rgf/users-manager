import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { RequestService } from '../request.service';
import { Request } from '../request';
import { SforceService } from '../sforce.service';
import { DatatableComponent } from '../datatable/datatable.component';
import { forkJoin } from 'rxjs';

@Component({
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
    public requests: Request[];
    public columnDefinitions: any[];
    @ViewChild(DatatableComponent) datatable: DatatableComponent<Request>;

    constructor (private requestService: RequestService, private sforceService: SforceService, private snackBar: MatSnackBar) { }

    ngOnInit () {
        this.loadRequests();
        this.columnDefinitions = [{
            headerLabel: 'Subject User',
            fieldName: 'subjectUserName',
        }, {
            headerLabel: 'Action',
            fieldName: 'action',
        }, {
            headerLabel: 'Requester',
            fieldName: 'requesterUserName',
        }, {
            headerLabel: 'Status',
            fieldName: 'status',
        }, {
            headerLabel: 'New User Name',
            fieldName: 'newUserName',
        }, {
            headerLabel: 'New User Email',
            fieldName: 'newUserEmail',
        }];
    }
    private loadRequests (): void {
        this.requestService.getRequests()
            .subscribe((requests: Request[]) => {
                if (this.isCurrentUserAdmin()) {
                    this.addUserNameToRequests(requests);
                    this.requests = requests;
                } else {
                    const currentUserId = this.sforceService.getCurrentUserId();
                    const myRequests = requests.filter((request: Request) => request.requesterUserId === currentUserId);
                    this.addUserNameToRequests(myRequests);
                    this.requests = myRequests;
                }
            });
    }
    private addUserNameToRequests (requests: Request[]): Promise<void> {
        const userIds = this.getUniqueUserIdsFromRequests(requests);
        return this.queryUsers(userIds).then((users: any[]) => {
            this.fillUserNameInRequests(requests, users);
        });
    }
    private queryUsers (userIds: string[]): Promise<any[]> {
        const query = 'SELECT Id, Name FROM User WHERE Id IN (' + userIds.map((userId: string) => '\'' + userId + '\'').join(',') + ')';
        return this.sforceService.query(query).then((result: any) => result.records);
    }
    private fillUserNameInRequests (requests: Request[], users: any[]): void {
        const userIdNameMap = this.getUserIdNameMap(users);
        requests.forEach((request: Request) => {
            request['requesterUserName'] = userIdNameMap[request.requesterUserId];
            request['subjectUserName'] = userIdNameMap[request.subjectUserId];
        });
    }
    private getUserIdNameMap (users: any[]): any {
        const idNameMap = {};
        users.forEach((user: any) => {
            idNameMap[user.Id] = user.Name;
        });
        return idNameMap;
    }
    private getUniqueUserIdsFromRequests (requests: Request[]): string[] {
        const nestedUserIds = requests.map((request: Request) => [request.requesterUserId, request.subjectUserId]);
        const userIds = this.flattenArray(nestedUserIds).filter((userId: string) => userId);
        return Array.from(new Set(userIds));
    }
    private flattenArray (array: any[]): string[] {
        return array.reduce((acc, val) => acc.concat(val), []);
    }
    public isCurrentUserAdmin (): boolean {
        return this.sforceService.isCurrentUserAdmin();
    }
    public approveSelected ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.processSelectedRequests('Approved');
    }
    public rejectSelected ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.processSelectedRequests('Rejected');
    }
    private processSelectedRequests (newStatus: string) {
        const updatedRequests = this.datatable.getSelected().map((request: Request) => {
            if (request.status === 'Pending') {
                return {
                    ...request,
                    status: newStatus
                };
            }
        });
        const observables = updatedRequests.map((request: Request) => this.requestService.updateRequest(request));
        forkJoin(observables).subscribe(() => {
            this.datatable.clearSelected();
            this.openSnackBar('Changed selected requests status to: ' + newStatus);
            this.loadRequests();
        });
    }
    private openSnackBar (message: string): void {
        this.snackBar.open(message, null, {
            duration: 4000
        });
    }
}
