import { Component, OnInit, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.css']
})
export class DatatableComponent<T> implements OnInit, OnChanges {
    @Input() public data: T[];
    @Input() public columnDefinitions: any[];
    @ViewChild(MatSort) sort: MatSort;
    public displayedColumns: string[];
    public dataSource: any;
    public selection: any;

    ngOnInit () {
        this.selection = new SelectionModel<T>(true, []);
    }
    ngOnChanges (changes: SimpleChanges): void {
        if (changes.data) {
            this.dataSource = new MatTableDataSource(changes.data.currentValue);
            this.dataSource.sort = this.sort;
        }
        if (changes.columnDefinitions) {
            this.displayedColumns = ['select', ...changes.columnDefinitions.currentValue.map((definition) => definition.fieldName)];
        }
    }
    public onMasterCheckboxChange ($event): void {
        if ($event) {
            this.masterToggle();
        }
    }
    private masterToggle (): void {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.dataSource.data.forEach((row: T) => this.selection.select(row));
        }
    }
    private isAllSelected (): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    public isMasterCheckboxChecked (): boolean {
        return this.selection.hasValue() && this.isAllSelected();
    }
    public isMasterCheckboxIndeterminate (): boolean {
        return this.selection.hasValue() && !this.isAllSelected();
    }
    public onCheckboxChange ($event, row: T): void {
        if ($event) {
            this.selection.toggle(row);
        }
    }
    public isCheckboxChecked (row: T): boolean {
        return this.selection.isSelected(row);
    }
    public onCheckboxClicked ($event): void {
        $event.stopPropagation();
    }
    public getSelected (): any {
        return this.selection.selected;
    }
}
