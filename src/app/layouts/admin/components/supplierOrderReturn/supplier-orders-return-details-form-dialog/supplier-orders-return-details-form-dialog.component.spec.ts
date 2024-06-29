import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrdersReturnDetailsFormDialogComponent } from './supplier-orders-return-details-form-dialog.component';

describe('SupplierOrdersReturnDetailsFormDialogComponent', () => {
  let component: SupplierOrdersReturnDetailsFormDialogComponent;
  let fixture: ComponentFixture<SupplierOrdersReturnDetailsFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierOrdersReturnDetailsFormDialogComponent]
    });
    fixture = TestBed.createComponent(SupplierOrdersReturnDetailsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
