import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Beer } from '../beer';
import { BeerService } from '../beer.service';

@Component({
    selector: 'app-add-beer',
    templateUrl: './add-beer.component.html',
    styleUrls: ['./add-beer.component.css']
})
export class AddBeerComponent implements OnInit {
    public selectedFileName: string;

    constructor(private beerService: BeerService, public snackBar: MatSnackBar) { }

    ngOnInit() {
    }
    public add(name: string, country: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.beerService.addBeer({ name, country } as Beer)
            .subscribe(beer => {
                const message = 'A new beer "' + name + '" added';
                console.log(message);
                this.openSnackBar(message);
            });
    }
    public getFileName ($event, beerPhotos: any): void {
        if (beerPhotos.length > 0) {
            this.selectedFileName = beerPhotos[0].name;
        }
    }
    public openSnackBar (message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000
        });
    }
}
