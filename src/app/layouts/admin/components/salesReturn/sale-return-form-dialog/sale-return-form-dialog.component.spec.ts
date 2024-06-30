import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleReturnFormDialogComponent } from './sale-return-form-dialog.component';

describe('SaleFormDialogComponent', () => {
  let component: SaleReturnFormDialogComponent;
  let fixture: ComponentFixture<SaleReturnFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleReturnFormDialogComponent]
    });
    fixture = TestBed.createComponent(SaleReturnFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
