import { TestBed } from '@angular/core/testing';

import { LiczenieService } from './liczenie.service';

describe('LiczenieService', () => {
  let service: LiczenieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiczenieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
