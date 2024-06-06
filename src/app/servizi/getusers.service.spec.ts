import { TestBed } from '@angular/core/testing';

import { GetusersService } from './getusers.service';

describe('GetusersService', () => {
  let service: GetusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
