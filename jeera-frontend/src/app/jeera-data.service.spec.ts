import { TestBed } from '@angular/core/testing';

import { JeeraDataService } from './jeera-data.service';

describe('JeeraDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JeeraDataService = TestBed.get(JeeraDataService);
    expect(service).toBeTruthy();
  });
});
