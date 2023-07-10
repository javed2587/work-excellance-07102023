import { TestBed } from '@angular/core/testing';

import { WorkSystemService } from './work-system.service';

describe('WorkSystemService', () => {
  let service: WorkSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
