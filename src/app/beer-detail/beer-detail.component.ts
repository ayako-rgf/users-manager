import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Beer } from '../beer';
import { BeerService } from '../beer.service';

@Component({
    templateUrl: './beer-detail.component.html',
    styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {
    @Input() beer: Beer;

    constructor(
        private route: ActivatedRoute,
        private beerService: BeerService,
        private location: Location
    ) { }

    ngOnInit() {
        this.getBeer();
    }
    private getBeer(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.beerService.getBeer(id)
            .subscribe(beer => this.beer = beer);
    }
    private getImagePath(): string {
        const id = +this.route.snapshot.paramMap.get('id');
        const path = '/assets/images/' + id + '.jpg';
        return path;
    }
    public goBack(): void {
        this.location.back();
    }
    public save(): void {
        this.beerService.updateBeer(this.beer)
            .subscribe(() => this.goBack());
    }
    public delete(): void {
        this.beerService.deleteBeer(this.beer)
            .subscribe(() => this.goBack());
    }
}
