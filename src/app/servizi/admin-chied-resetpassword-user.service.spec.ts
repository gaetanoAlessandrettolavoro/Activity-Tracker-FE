import { TestBed } from '@angular/core/testing';

import { AdminChiedResetpasswordUserService } from './admin-chied-resetpassword-user.service';

describe('AdminChiedResetpasswordUserService', () => {
  let service: AdminChiedResetpasswordUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminChiedResetpasswordUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
