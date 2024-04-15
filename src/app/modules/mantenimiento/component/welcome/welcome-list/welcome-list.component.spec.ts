import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeListComponent } from './welcome-list.component';

describe('WelcomeListComponent', () => {
  let component: WelcomeListComponent;
  let fixture: ComponentFixture<WelcomeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeListComponent]
    });
    fixture = TestBed.createComponent(WelcomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
