import { TestBed } from '@angular/core/testing';

import { ResultShareService } from './result-share.service';

describe('ResultShareService', () => {
  let service: ResultShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
