import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalchipapasComponent } from './salchipapas.component';

describe('SalchipapasComponent', () => {
  let component: SalchipapasComponent;
  let fixture: ComponentFixture<SalchipapasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalchipapasComponent]
    });
    fixture = TestBed.createComponent(SalchipapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
