import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSupplierOrderReturnComponent } from './print-supplier-order-return.component';

describe('PrintSupplierOrderReturnComponent', () => {
  let component: PrintSupplierOrderReturnComponent;
  let fixture: ComponentFixture<PrintSupplierOrderReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintSupplierOrderReturnComponent]
    });
    fixture = TestBed.createComponent(PrintSupplierOrderReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
