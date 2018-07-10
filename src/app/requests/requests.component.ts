import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { BeerService } from '../beer.service';
import { Request } from '../request';

@Component({
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
    public dataSource: any;
    public displayedColumns: string[] = ['id', 'requester', 'subject', 'status'];
    @ViewChild(MatSort) sort: MatSort;

    constructor (private beerService: BeerService) { }

    ngOnInit () {
        this.getUsers();
    }
    public getUsers (): void {
        this.beerService.getRequests()
            .subscribe((users: Request[]) => {
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.sort = this.sort;
            });
    }
}
