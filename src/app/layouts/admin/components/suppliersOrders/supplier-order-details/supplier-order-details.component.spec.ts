import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderDetailsComponent } from './supplier-order-details.component';

describe('SupplierOrderDetailsComponent', () => {
  let component: SupplierOrderDetailsComponent;
  let fixture: ComponentFixture<SupplierOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(SupplierOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
