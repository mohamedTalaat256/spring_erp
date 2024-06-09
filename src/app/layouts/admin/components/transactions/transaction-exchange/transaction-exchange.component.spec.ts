import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionExchangeComponent } from './transaction-exchange.component';

describe('TransactionExchangeComponent', () => {
  let component: TransactionExchangeComponent;
  let fixture: ComponentFixture<TransactionExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionExchangeComponent]
    });
    fixture = TestBed.createComponent(TransactionExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
