import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoZApiComponent } from './info-z-api.component';

describe('InfoZApiComponent', () => {
  let component: InfoZApiComponent;
  let fixture: ComponentFixture<InfoZApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoZApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoZApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
