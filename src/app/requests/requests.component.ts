import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request';
import { SforceService } from '../sforce.service';
import { DatatableComponent } from '../datatable/datatable.component';

@Component({
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
    public requests: Request[];
    public columnDefinitions: any[];
    @ViewChild(DatatableComponent) selection: DatatableComponent<Request>;

    constructor (private requestService: RequestService, private sforceService: SforceService) { }

    ngOnInit () {
        this.getRequests();
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
    private getRequests (): void {
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
        this.selection.getSelected().forEach((request: Request) => {
            if (request.action === 'Create') {
                this.processUserCreationRequest(request);
            } else if (request.action === 'Deactivate') {
                this.processUserDeactivationRequest(request);
            }
        });
    }
    private processUserCreationRequest (request: Request): void {
        request.status = 'Approved';
        this.requestService.updateRequest(request);
    }
    private processUserDeactivationRequest (request: Request): void {
        this.sforceService.deactivateUser(request.subjectUserId).then(() => {
            request.status = 'Approved';
            this.requestService.updateRequest(request);
        });
    }
    public rejectSelected ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.selection.getSelected().forEach((request: Request) => {
            if (request.status === 'Pending') {
                request.status = 'Rejected';
                this.requestService.updateRequest(request);
            }
        });
    }
}
