import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TologinDashboardComponent } from './tologin-dashboard.component';

describe('TologinDashboardComponent', () => {
  let component: TologinDashboardComponent;
  let fixture: ComponentFixture<TologinDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TologinDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TologinDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
