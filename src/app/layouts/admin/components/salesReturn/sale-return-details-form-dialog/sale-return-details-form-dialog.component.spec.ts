import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleReturnDetailsFormDialogComponent } from './sale-return-details-form-dialog.component';

describe('SaleReturnDetailsFormDialogComponent', () => {
  let component: SaleReturnDetailsFormDialogComponent;
  let fixture: ComponentFixture<SaleReturnDetailsFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleReturnDetailsFormDialogComponent]
    });
    fixture = TestBed.createComponent(SaleReturnDetailsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
