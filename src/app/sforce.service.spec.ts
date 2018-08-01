import { TestBed, inject } from '@angular/core/testing';

import { SforceService } from './sforce.service';

describe('SforceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SforceService]
        });
    });

    it('should be created', inject([SforceService], (service: SforceService) => {
        expect(service).toBeTruthy();
    }));
});
