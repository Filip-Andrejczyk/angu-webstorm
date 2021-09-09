import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PismaListComponent } from './pisma-list.component';

describe('PismaListComponent', () => {
  let component: PismaListComponent;
  let fixture: ComponentFixture<PismaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PismaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PismaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
