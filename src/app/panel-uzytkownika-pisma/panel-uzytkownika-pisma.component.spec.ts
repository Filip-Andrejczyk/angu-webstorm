import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUzytkownikaPismaComponent } from './panel-uzytkownika-pisma.component';

describe('PanelUzytkownikaPismaComponent', () => {
  let component: PanelUzytkownikaPismaComponent;
  let fixture: ComponentFixture<PanelUzytkownikaPismaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelUzytkownikaPismaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUzytkownikaPismaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
