import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrornoauthorizadoComponent } from './errornoauthorizado.component';

describe('ErrornoauthorizadoComponent', () => {
  let component: ErrornoauthorizadoComponent;
  let fixture: ComponentFixture<ErrornoauthorizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrornoauthorizadoComponent]
    });
    fixture = TestBed.createComponent(ErrornoauthorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
