import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrdersReturnFormDialogComponent } from './supplier-orders-return-form-dialog.component';

describe('SupplierOrdersReturnFormDialogComponent', () => {
  let component: SupplierOrdersReturnFormDialogComponent;
  let fixture: ComponentFixture<SupplierOrdersReturnFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierOrdersReturnFormDialogComponent]
    });
    fixture = TestBed.createComponent(SupplierOrdersReturnFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
