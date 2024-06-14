import { TestBed } from '@angular/core/testing';

import { GetActivityService } from './get-activity.service';

describe('GetActivityService', () => {
  let service: GetActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
