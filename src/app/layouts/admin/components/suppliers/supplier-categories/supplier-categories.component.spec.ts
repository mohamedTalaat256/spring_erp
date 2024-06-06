import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCategoriesComponent } from './supplier-categories.component';

describe('SupplierCategoriesComponent', () => {
  let component: SupplierCategoriesComponent;
  let fixture: ComponentFixture<SupplierCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierCategoriesComponent]
    });
    fixture = TestBed.createComponent(SupplierCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
