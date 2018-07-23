import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { RequestService } from './request.service';

describe('RequestService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RequestService],
            imports: [
                HttpClientModule,
                RouterTestingModule
            ]
        });
    });

    it('should be created', inject([RequestService], (service: RequestService) => {
        expect(service).toBeTruthy();
    }));
});
