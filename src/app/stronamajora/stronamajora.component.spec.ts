import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StronamajoraComponent } from './stronamajora.component';

describe('StronamajoraComponent', () => {
  let component: StronamajoraComponent;
  let fixture: ComponentFixture<StronamajoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StronamajoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StronamajoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
