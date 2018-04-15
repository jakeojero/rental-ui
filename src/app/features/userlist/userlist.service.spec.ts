import { TestBed, inject } from '@angular/core/testing';

import { UserlistService } from './userlist.service';

describe('UserlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserlistService]
    });
  });

  it('should be created', inject([UserlistService], (service: UserlistService) => {
    expect(service).toBeTruthy();
  }));
});
