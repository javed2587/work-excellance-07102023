import { TestBed } from '@angular/core/testing';

import { PageChecksService } from './page-checks.service';

describe('PageChecksService', () => {
  let service: PageChecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageChecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
