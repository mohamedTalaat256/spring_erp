import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDetailsFormDialogComponent } from './sale-details-form-dialog.component';

describe('SaleDetailsFormDialogComponent', () => {
  let component: SaleDetailsFormDialogComponent;
  let fixture: ComponentFixture<SaleDetailsFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleDetailsFormDialogComponent]
    });
    fixture = TestBed.createComponent(SaleDetailsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
