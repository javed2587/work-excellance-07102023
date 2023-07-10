import { TestBed } from '@angular/core/testing';

import { PageSetGuard } from './page-set.guard';

describe('PageSetGuard', () => {
  let guard: PageSetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PageSetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
