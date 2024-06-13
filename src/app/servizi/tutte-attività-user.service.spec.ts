import { TestBed } from '@angular/core/testing';

import { TutteAttivitàUserService } from './tutte-attività-user.service';

describe('TutteAttivitàUserService', () => {
  let service: TutteAttivitàUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutteAttivitàUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
