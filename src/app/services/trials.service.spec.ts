import { TestBed } from '@angular/core/testing';

import { TrialService } from './trial.service';

describe('TrialsService', () => {
  let service: TrialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
