import { TestBed } from '@angular/core/testing';

import { ErrorServiziService } from './error-servizi.service';

describe('ErrorServiziService', () => {
  let service: ErrorServiziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorServiziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
