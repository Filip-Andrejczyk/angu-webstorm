import { TestBed } from '@angular/core/testing';

import { CurrentPlayarService } from './current-playar.service';

describe('CurrentPlayarService', () => {
  let service: CurrentPlayarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPlayarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
