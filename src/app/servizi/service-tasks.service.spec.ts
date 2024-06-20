import { TestBed } from '@angular/core/testing';

import { ServiceTasksService } from './service-tasks.service';

describe('ServiceTasksService', () => {
  let service: ServiceTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
