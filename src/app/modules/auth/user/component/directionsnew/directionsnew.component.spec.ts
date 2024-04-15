import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsnewComponent } from './directionsnew.component';

describe('DirectionsnewComponent', () => {
  let component: DirectionsnewComponent;
  let fixture: ComponentFixture<DirectionsnewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectionsnewComponent]
    });
    fixture = TestBed.createComponent(DirectionsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
