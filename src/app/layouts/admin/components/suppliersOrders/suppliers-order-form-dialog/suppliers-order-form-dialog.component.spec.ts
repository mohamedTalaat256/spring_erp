import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersOrderFormDialogComponent } from './suppliers-order-form-dialog.component';

describe('SuppliersOrderFormDialogComponent', () => {
  let component: SuppliersOrderFormDialogComponent;
  let fixture: ComponentFixture<SuppliersOrderFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersOrderFormDialogComponent]
    });
    fixture = TestBed.createComponent(SuppliersOrderFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
