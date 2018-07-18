import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { BeerService } from '../beer.service';
import { User } from '../user';
import { Request } from '../request';
import { SforceService } from '../sforce.service';

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public dataSource: any;
    public displayedColumns: string[] = ['select', 'id', 'name', 'email', 'isActive'];
    public selection: any;
    @ViewChild(MatSort) sort: MatSort;

    constructor (private beerService: BeerService, public snackBar: MatSnackBar, private sforceService: SforceService) { }

    ngOnInit () {
        this.getUsers();
        this.selection = new SelectionModel<User>(true, []);
    }
    public getUsers (): void {
        this.sforceService.query('SELECT Id, Name, Email, IsActive FROM User ORDER BY LastModifiedDate DESC LIMIT 5')
            .then((result: any) => {
                this.dataSource = new MatTableDataSource(result.records);
                this.dataSource.sort = this.sort;
            });
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
            this.dataSource.data.forEach((row: User) => this.selection.select(row));
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
    public requestDeactivation ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        console.log(this.selection.selected);
        const requests = this.buildRequests(this.selection.selected, 'Deactivate');
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
