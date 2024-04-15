import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsacompraComponent } from './bolsacompra.component';

describe('BolsacompraComponent', () => {
  let component: BolsacompraComponent;
  let fixture: ComponentFixture<BolsacompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BolsacompraComponent]
    });
    fixture = TestBed.createComponent(BolsacompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
