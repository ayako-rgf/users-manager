import { TestBed, inject } from '@angular/core/testing';

import { RequestsUserNameService } from './requests-user-name.service';

describe('RequestsUserNameService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RequestsUserNameService]
        });
    });

    it('should be created', inject([RequestsUserNameService], (service: RequestsUserNameService) => {
        expect(service).toBeTruthy();
    }));
});
