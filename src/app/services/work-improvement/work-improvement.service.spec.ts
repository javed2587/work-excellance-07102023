import { TestBed } from '@angular/core/testing';

import { WorkImprovementService } from './work-improvement.service';

describe('WorkImprovementService', () => {
  let service: WorkImprovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkImprovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
