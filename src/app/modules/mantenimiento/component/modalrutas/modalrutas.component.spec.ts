import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrutasComponent } from './modalrutas.component';

describe('ModalrutasComponent', () => {
  let component: ModalrutasComponent;
  let fixture: ComponentFixture<ModalrutasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalrutasComponent]
    });
    fixture = TestBed.createComponent(ModalrutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
