import { TestBed } from '@angular/core/testing';

import { ActivitiesServicesService } from './activities-services.service';

describe('ActivitiesServicesService', () => {
  let service: ActivitiesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
