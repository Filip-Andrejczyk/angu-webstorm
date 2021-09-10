import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPozewComponent } from './edit-pozew.component';

describe('EditPozewComponent', () => {
  let component: EditPozewComponent;
  let fixture: ComponentFixture<EditPozewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPozewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPozewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
