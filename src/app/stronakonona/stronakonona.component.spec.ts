import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StronakononaComponent } from './stronakonona.component';

describe('StronakononaComponent', () => {
  let component: StronakononaComponent;
  let fixture: ComponentFixture<StronakononaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StronakononaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StronakononaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
