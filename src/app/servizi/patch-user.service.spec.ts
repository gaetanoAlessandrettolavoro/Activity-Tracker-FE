import { TestBed } from '@angular/core/testing';

import { PatchUserService } from './patch-user.service';

describe('PatchUserService', () => {
  let service: PatchUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
