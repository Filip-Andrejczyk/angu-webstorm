import { TestBed } from '@angular/core/testing';

import { CrudPismoService } from './crud-pismo.service';

describe('CrudPismoService', () => {
  let service: CrudPismoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPismoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
