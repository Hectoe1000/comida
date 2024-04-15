import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlpassComponent } from './controlpass.component';

describe('ControlpassComponent', () => {
  let component: ControlpassComponent;
  let fixture: ComponentFixture<ControlpassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlpassComponent]
    });
    fixture = TestBed.createComponent(ControlpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
