import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { BeerService } from './beer.service';

describe('BeerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BeerService],
            imports: [
                HttpClientModule,
                RouterTestingModule
            ]
        });
    });

    it('should be created', inject([BeerService], (service: BeerService) => {
        expect(service).toBeTruthy();
    }));
});
