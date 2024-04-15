import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSidevarComponent } from './template-sidevar.component';

describe('TemplateSidevarComponent', () => {
  let component: TemplateSidevarComponent;
  let fixture: ComponentFixture<TemplateSidevarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateSidevarComponent]
    });
    fixture = TestBed.createComponent(TemplateSidevarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
