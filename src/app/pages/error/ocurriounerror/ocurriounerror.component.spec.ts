import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcurriounerrorComponent } from './ocurriounerror.component';

describe('OcurriounerrorComponent', () => {
  let component: OcurriounerrorComponent;
  let fixture: ComponentFixture<OcurriounerrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcurriounerrorComponent]
    });
    fixture = TestBed.createComponent(OcurriounerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
