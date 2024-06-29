import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBalanceComponent } from './items-balance.component';

describe('ItemsBalanceComponent', () => {
  let component: ItemsBalanceComponent;
  let fixture: ComponentFixture<ItemsBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsBalanceComponent]
    });
    fixture = TestBed.createComponent(ItemsBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
