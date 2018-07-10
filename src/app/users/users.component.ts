import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource } from '@angular/material';
import { BeerService } from '../beer.service';
import { User } from '../user';


@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public dataSource: any;
    public displayedColumns: string[] = ['select', 'id', 'name', 'status'];
    public selection: any;
    @ViewChild(MatSort) sort: MatSort;

    constructor (private beerService: BeerService) { }

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
}
