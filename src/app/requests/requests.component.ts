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
            headerLabel: 'ID',
            fieldName: 'id',
        }, {
            headerLabel: 'Subject User Id',
            fieldName: 'subjectUserId',
        }, {
            headerLabel: 'Action',
            fieldName: 'action',
        }, {
            headerLabel: 'Requester',
            fieldName: 'requesterUserId',
        }, {
            headerLabel: 'Status',
            fieldName: 'status',
        }];
    }
    private loadRequests (): void {
        this.requestService.getRequests()
            .subscribe((requests: Request[]) => {
                if (this.isCurrentUserAdmin()) {
                    this.requests = requests;
                } else {
                    const currentUserId = this.sforceService.getCurrentUserId();
                    this.requests = requests.filter((request: Request) => request.requesterUserId === currentUserId);
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
