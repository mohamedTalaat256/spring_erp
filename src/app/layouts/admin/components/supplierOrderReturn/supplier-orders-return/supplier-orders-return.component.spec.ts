import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrdersReturnComponent } from './supplier-orders-return.component';

describe('SupplierOrdersReturnComponent', () => {
  let component: SupplierOrdersReturnComponent;
  let fixture: ComponentFixture<SupplierOrdersReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierOrdersReturnComponent]
    });
    fixture = TestBed.createComponent(SupplierOrdersReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
