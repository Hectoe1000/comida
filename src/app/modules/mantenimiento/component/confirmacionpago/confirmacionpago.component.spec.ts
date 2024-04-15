import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionpagoComponent } from './confirmacionpago.component';

describe('ConfirmacionpagoComponent', () => {
  let component: ConfirmacionpagoComponent;
  let fixture: ComponentFixture<ConfirmacionpagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionpagoComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
