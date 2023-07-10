import { TestBed } from '@angular/core/testing';

import { OrgListPageGuard } from './org-list-page.guard';

describe('OrgListPageGuard', () => {
  let guard: OrgListPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrgListPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
