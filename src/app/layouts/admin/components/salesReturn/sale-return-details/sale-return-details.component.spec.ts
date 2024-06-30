import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleReturnDetailsComponent } from './sale-return-details.component';

describe('SaleDetailsComponent', () => {
  let component: SaleReturnDetailsComponent;
  let fixture: ComponentFixture<SaleReturnDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleReturnDetailsComponent]
    });
    fixture = TestBed.createComponent(SaleReturnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
