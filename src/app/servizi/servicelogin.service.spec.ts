import { TestBed } from '@angular/core/testing';

import { ServiceloginService } from './servicelogin.service';

describe('ServiceloginService', () => {
  let service: ServiceloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
