import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiqueosComponent } from './piqueos.component';

describe('PiqueosComponent', () => {
  let component: PiqueosComponent;
  let fixture: ComponentFixture<PiqueosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiqueosComponent]
    });
    fixture = TestBed.createComponent(PiqueosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
