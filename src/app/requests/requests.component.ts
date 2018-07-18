import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource } from '@angular/material';
import { BeerService } from '../beer.service';
import { Request } from '../request';
import { SforceService } from '../sforce.service';

@Component({
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
    public dataSource: any;
    public displayedColumns: string[] = ['select', 'id', 'subject', 'action', 'requester', 'status'];
    public selection: any;
    @ViewChild(MatSort) sort: MatSort;

    constructor (private beerService: BeerService, private sforceService: SforceService) { }

    ngOnInit () {
        this.getRequests();
        this.selection = new SelectionModel<Request>(true, []);
    }
    public getRequests (): void {
        this.beerService.getRequests()
            .subscribe((users: Request[]) => {
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.sort = this.sort;
            });
    }
    public getSubjectUserText (request: Request): string {
        if (request.subjectUserId) {
            return request.subjectUserId;
        } else {
            return request.newUser.Name + ' (' + request.newUser.Email + ')';
        }
    }
    public isAllSelected (): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    public masterToggle (): void {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.dataSource.data.forEach((row: Request) => this.selection.select(row));
        }
    }
    public onMasterCheckboxChange ($event): void {
        if ($event) {
            this.masterToggle();
        }
    }
    public isMasterCheckboxChecked (): boolean {
        return this.selection.hasValue() && this.isAllSelected();
    }
    public isMasterCheckboxIndeterminate (): boolean {
        return this.selection.hasValue() && !this.isAllSelected();
    }
    public onCheckboxChange ($event, row): void {
        if ($event) {
            this.selection.toggle(row);
        }
    }
    public isCheckboxChecked (row): boolean {
        return this.selection.isSelected(row);
    }
    public onCheckboxClicked ($event): void {
        $event.stopPropagation();
    }
    public approveSelected ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        console.log(this.selection.selected);
        this.selection.selected.forEach((request: Request) => {
            if (request.action === 'Create') {
                this.processUserCreationRequest(request);
            } else if (request.action === 'Deactivate') {
                this.processUserDeactivationRequest(request);
            }
        });
    }
    private processUserCreationRequest (request: Request): void {
        this.sforceService.createUser(request.newUser).then(() => {
            request.status = 'Approved';
            this.beerService.updateRequest(request);
        });
    }
    private processUserDeactivationRequest (request: Request): void {
        this.sforceService.deactivateUser(request.subjectUserId).then(() => {
            request.status = 'Approved';
            this.beerService.updateRequest(request);
        });
    }
    public rejectSelected ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        console.log(this.selection.selected);
    }
}
