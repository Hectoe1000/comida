import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestacompraComponent } from './respuestacompra.component';

describe('RespuestacompraComponent', () => {
  let component: RespuestacompraComponent;
  let fixture: ComponentFixture<RespuestacompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RespuestacompraComponent]
    });
    fixture = TestBed.createComponent(RespuestacompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
