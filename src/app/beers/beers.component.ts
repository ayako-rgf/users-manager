import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Beer } from '../beer';
import { BeerService } from '../beer.service';

@Component({
    templateUrl: './beers.component.html',
    styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
    dataSource;
    displayedColumns: string[] = ['id', 'name', 'country'];
    @ViewChild(MatSort) sort: MatSort;
    constructor(private beerService: BeerService) { }

    ngOnInit() {
        this.getBeers();
    }
    public getBeers(): void {
        this.beerService.getBeers()
            .subscribe(beers => {
                this.dataSource = new MatTableDataSource(beers);
                this.dataSource.sort = this.sort;
            });
    }
}
