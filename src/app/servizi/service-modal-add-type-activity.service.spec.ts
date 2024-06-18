import { TestBed } from '@angular/core/testing';

import { ServiceModalAddTypeActivityService } from './service-modal-add-type-activity.service';

describe('ServiceModalAddTypeActivityService', () => {
  let service: ServiceModalAddTypeActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceModalAddTypeActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
