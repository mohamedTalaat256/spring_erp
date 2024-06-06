import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCategoryFormDialogComponent } from './supplier-category-form-dialog.component';

describe('SupplierCategoryFormDialogComponent', () => {
  let component: SupplierCategoryFormDialogComponent;
  let fixture: ComponentFixture<SupplierCategoryFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierCategoryFormDialogComponent]
    });
    fixture = TestBed.createComponent(SupplierCategoryFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
