import { TestBed, inject } from '@angular/core/testing';

import { SforceOauthService } from './sforce-oauth.service';

describe('SforceOauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SforceOauthService]
    });
  });

  it('should be created', inject([SforceOauthService], (service: SforceOauthService) => {
    expect(service).toBeTruthy();
  }));
});
