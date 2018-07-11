import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { BeerService } from '../beer.service';
import { User } from '../user';
import { Request } from '../request';


@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public dataSource: any;
    public displayedColumns: string[] = ['select', 'id', 'name', 'email', 'status'];
    public selection: any;
    @ViewChild(MatSort) sort: MatSort;

    constructor (private beerService: BeerService, public snackBar: MatSnackBar) { }

    ngOnInit () {
        this.getUsers();
        this.selection = new SelectionModel<User>(true, []);
    }
    public getUsers (): void {
        this.beerService.getUsers()
            .subscribe((users: User[]) => {
                this.dataSource = new MatTableDataSource(users);
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
        const requests = this.buildRequests(this.selection.selected);
        requests.forEach((request: Request) => {
            this.beerService.addRequest(request as Request).subscribe(() => {
                const message = 'Request sent.';
                console.log(message);
                this.openSnackBar(message);
            });
        });
    }
    private buildRequests (users: User[]): Request[] {
        return users.map((user: User) => {
            return {
                requesterUserId: 103, //FIXME!
                subjectUserId: user.id
            } as Request;
        });
    }
    public openSnackBar (message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000
        });
    }
}
