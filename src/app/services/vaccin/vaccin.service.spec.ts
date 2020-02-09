import { TestBed, inject } from '@angular/core/testing';

import { VaccinService } from './vaccin.service';

describe('VaccinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VaccinService]
    });
  });

  it('should be created', inject([VaccinService], (service: VaccinService) => {
    expect(service).toBeTruthy();
  }));
});
