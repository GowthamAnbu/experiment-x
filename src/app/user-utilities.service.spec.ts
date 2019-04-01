import { TestBed } from '@angular/core/testing';

import { UserUtilitiesService } from './user-utilities.service';

describe('UserUtilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserUtilitiesService = TestBed.get(UserUtilitiesService);
    expect(service).toBeTruthy();
  });
});
