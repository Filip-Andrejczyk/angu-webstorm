import { TestBed } from '@angular/core/testing';

import { TablicaLstorageService } from './tablica-lstorage.service';

describe('TablicaLstorageService', () => {
  let service: TablicaLstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablicaLstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
