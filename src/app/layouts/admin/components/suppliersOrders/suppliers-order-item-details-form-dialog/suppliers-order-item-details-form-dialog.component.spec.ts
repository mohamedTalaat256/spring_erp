import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersOrderItemDetailsFormDialogComponent } from './suppliers-order-item-details-form-dialog.component';

describe('SuppliersOrderItemDetailsFormDialogComponent', () => {
  let component: SuppliersOrderItemDetailsFormDialogComponent;
  let fixture: ComponentFixture<SuppliersOrderItemDetailsFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersOrderItemDetailsFormDialogComponent]
    });
    fixture = TestBed.createComponent(SuppliersOrderItemDetailsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
