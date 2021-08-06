import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrazkiComponent } from './obrazki.component';

describe('ObrazkiComponent', () => {
  let component: ObrazkiComponent;
  let fixture: ComponentFixture<ObrazkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObrazkiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrazkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
