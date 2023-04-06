import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetRestaurantPage } from './det-restaurant.page';

describe('DetRestaurantPage', () => {
  let component: DetRestaurantPage;
  let fixture: ComponentFixture<DetRestaurantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetRestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
