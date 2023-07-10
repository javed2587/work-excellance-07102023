import { TestBed } from '@angular/core/testing';

import { WorkDirectionService } from './work-direction.service';

describe('WorkDirectionService', () => {
  let service: WorkDirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkDirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
