import { TestBed, inject } from '@angular/core/testing';

import { PropertylistService } from './propertylist.service';

describe('PropertylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertylistService]
    });
  });

  it('should be created', inject([PropertylistService], (service: PropertylistService) => {
    expect(service).toBeTruthy();
  }));
});
