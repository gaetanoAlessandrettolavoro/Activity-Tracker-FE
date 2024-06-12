import { TestBed } from '@angular/core/testing';

import { AdminAddActivityForUserService } from './admin-add-activity-for-user.service';

describe('AdminAddActivityForUserService', () => {
  let service: AdminAddActivityForUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAddActivityForUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
