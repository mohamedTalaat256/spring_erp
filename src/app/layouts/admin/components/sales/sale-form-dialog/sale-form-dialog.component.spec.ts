import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleFormDialogComponent } from './sale-form-dialog.component';

describe('SaleFormDialogComponent', () => {
  let component: SaleFormDialogComponent;
  let fixture: ComponentFixture<SaleFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleFormDialogComponent]
    });
    fixture = TestBed.createComponent(SaleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
