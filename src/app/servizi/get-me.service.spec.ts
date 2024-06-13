import { TestBed } from '@angular/core/testing';

import { GetMeService } from './get-me.service';

describe('GetMeService', () => {
  let service: GetMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
