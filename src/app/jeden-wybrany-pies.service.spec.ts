import { TestBed } from '@angular/core/testing';

import { JedenWybranyPiesService } from './jeden-wybrany-pies.service';

describe('JedenWybranyPiesService', () => {
  let service: JedenWybranyPiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JedenWybranyPiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
