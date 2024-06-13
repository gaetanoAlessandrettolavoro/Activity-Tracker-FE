import { TestBed } from '@angular/core/testing';

import { DeleteActivityService } from './delete-activity.service';

describe('DeleteActivityService', () => {
  let service: DeleteActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
