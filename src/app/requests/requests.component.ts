import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { RequestService } from '../request.service';
import { RequestsUserNameService } from '../requests-user-name.service';
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

    constructor (
        private requestService: RequestService, private requestsUserNameService: RequestsUserNameService,
        private sforceService: SforceService, private snackBar: MatSnackBar) {
    }

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
                    this.requestsUserNameService.addUserNameToRequests(requests);
                    this.requests = requests;
                } else {
                    const currentUserId = this.sforceService.getCurrentUserId();
                    const myRequests = requests.filter((request: Request) => request.requesterUserId === currentUserId);
                    this.requestsUserNameService.addUserNameToRequests(myRequests);
                    this.requests = myRequests;
                }
            });
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
        const selectedRequests = this.datatable.getSelected();
        if (selectedRequests.length === 0) {
            return;
        }
        const pendingRequests = selectedRequests.filter((request: Request) => request.status === 'Pending');
        if (pendingRequests.length === 0) {
            this.openSnackBar('You cannot approve/reject already approved/rejected requests.');
            return;
        }
        this.updateRequestsStatus(pendingRequests, newStatus);
    }
    private updateRequestsStatus (pendingRequests: Request[], newStatus: string): void {
        const updatedRequests = pendingRequests.map((request: Request) => {
            return {
                ...request,
                status: newStatus
            };
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
