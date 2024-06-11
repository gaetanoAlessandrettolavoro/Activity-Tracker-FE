import { TestBed } from '@angular/core/testing';

import { ActivityUserService } from './activity-user.service';

describe('ActivityUserService', () => {
  let service: ActivityUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
