import { TestBed, inject } from '@angular/core/testing';

import { SforceDataService } from './sforce-data.service';

describe('SforceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SforceDataService]
    });
  });

  it('should be created', inject([SforceDataService], (service: SforceDataService) => {
    expect(service).toBeTruthy();
  }));
});
