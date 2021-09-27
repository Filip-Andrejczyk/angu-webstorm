import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablicaRekordowComponent } from './tablica-rekordow.component';

describe('TablicaRekordowComponent', () => {
  let component: TablicaRekordowComponent;
  let fixture: ComponentFixture<TablicaRekordowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablicaRekordowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablicaRekordowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
