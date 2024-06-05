import { TestBed } from '@angular/core/testing';

import { PostRegisterService } from './post-register.service';

describe('PostRegisterService', () => {
  let service: PostRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
