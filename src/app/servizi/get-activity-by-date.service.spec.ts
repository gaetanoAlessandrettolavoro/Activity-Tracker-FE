import { TestBed } from '@angular/core/testing';

import { GetActivityByDateService } from './get-activity-by-date.service';

describe('GetActivityByDateService', () => {
  let service: GetActivityByDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetActivityByDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
