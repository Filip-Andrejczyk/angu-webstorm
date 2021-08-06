import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WyswietlanieLicznikaComponent } from './wyswietlanie-licznika.component';

describe('WyswietlanieLicznikaComponent', () => {
  let component: WyswietlanieLicznikaComponent;
  let fixture: ComponentFixture<WyswietlanieLicznikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WyswietlanieLicznikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WyswietlanieLicznikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
