import { TestBed, inject } from '@angular/core/testing';

import { EditpropertyService } from './editproperty.service';

describe('EditpropertyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditpropertyService]
    });
  });

  it('should be created', inject([EditpropertyService], (service: EditpropertyService) => {
    expect(service).toBeTruthy();
  }));
});
