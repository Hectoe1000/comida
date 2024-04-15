import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateListaComponent } from './template-lista.component';

describe('TemplateListaComponent', () => {
  let component: TemplateListaComponent;
  let fixture: ComponentFixture<TemplateListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateListaComponent]
    });
    fixture = TestBed.createComponent(TemplateListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
