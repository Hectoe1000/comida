import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectionComponent } from './indirection.component';

describe('IndirectionComponent', () => {
  let component: IndirectionComponent;
  let fixture: ComponentFixture<IndirectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndirectionComponent]
    });
    fixture = TestBed.createComponent(IndirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
