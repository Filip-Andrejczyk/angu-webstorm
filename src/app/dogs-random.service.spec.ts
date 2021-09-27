import { TestBed } from '@angular/core/testing';

import { DogsRandomService } from './dogs-random.service';

describe('DogsRandomService', () => {
  let service: DogsRandomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogsRandomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
