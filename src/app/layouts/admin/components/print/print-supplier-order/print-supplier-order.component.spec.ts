import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSupplierOrderComponent } from './print-supplier-order.component';

describe('PrintSupplierOrderComponent', () => {
  let component: PrintSupplierOrderComponent;
  let fixture: ComponentFixture<PrintSupplierOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintSupplierOrderComponent]
    });
    fixture = TestBed.createComponent(PrintSupplierOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
