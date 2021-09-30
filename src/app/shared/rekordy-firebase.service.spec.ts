import { TestBed } from '@angular/core/testing';

import { RekordyFirebaseService } from './rekordy-firebase.service';

describe('RekordyFirebaseService', () => {
  let service: RekordyFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekordyFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
