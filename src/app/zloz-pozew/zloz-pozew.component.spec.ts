import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZlozPozewComponent } from './zloz-pozew.component';

describe('ZlozPozewComponent', () => {
  let component: ZlozPozewComponent;
  let fixture: ComponentFixture<ZlozPozewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZlozPozewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZlozPozewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
