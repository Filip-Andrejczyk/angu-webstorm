import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLicznikComponent } from './button-licznik.component';

describe('ButtonLicznikComponent', () => {
  let component: ButtonLicznikComponent;
  let fixture: ComponentFixture<ButtonLicznikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLicznikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLicznikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
