import { TestBed } from '@angular/core/testing';

import { ImpostNewpassordUserAddBackpasswordService } from './impost-newpassord-user-add-backpassword.service';

describe('ImpostNewpassordUserAddBackpasswordService', () => {
  let service: ImpostNewpassordUserAddBackpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpostNewpassordUserAddBackpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
