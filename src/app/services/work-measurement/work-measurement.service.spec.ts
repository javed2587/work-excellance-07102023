import { TestBed } from '@angular/core/testing';

import { WorkMeasurementService } from './work-measurement.service';

describe('WorkMeasurementService', () => {
  let service: WorkMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
