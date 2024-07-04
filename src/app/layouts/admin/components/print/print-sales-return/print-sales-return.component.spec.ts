import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSalesReturnComponent } from './print-sales-return.component';

describe('PrintSalesReturnComponent', () => {
  let component: PrintSalesReturnComponent;
  let fixture: ComponentFixture<PrintSalesReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintSalesReturnComponent]
    });
    fixture = TestBed.createComponent(PrintSalesReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
