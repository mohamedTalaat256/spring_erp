import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrdersReturnDetailsComponent } from './supplier-orders-return-details.component';

describe('SupplierOrdersReturnDetailsComponent', () => {
  let component: SupplierOrdersReturnDetailsComponent;
  let fixture: ComponentFixture<SupplierOrdersReturnDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierOrdersReturnDetailsComponent]
    });
    fixture = TestBed.createComponent(SupplierOrdersReturnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
