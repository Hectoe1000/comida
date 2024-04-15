import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestShopingComponent } from './latest-shoping.component';

describe('LatestShopingComponent', () => {
  let component: LatestShopingComponent;
  let fixture: ComponentFixture<LatestShopingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatestShopingComponent]
    });
    fixture = TestBed.createComponent(LatestShopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
