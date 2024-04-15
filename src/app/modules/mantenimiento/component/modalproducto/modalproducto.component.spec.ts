import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalproductoComponent } from './modalproducto.component';

describe('ModalproductoComponent', () => {
  let component: ModalproductoComponent;
  let fixture: ComponentFixture<ModalproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalproductoComponent]
    });
    fixture = TestBed.createComponent(ModalproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
