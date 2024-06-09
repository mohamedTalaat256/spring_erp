import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCollecrComponent } from './transaction-collect.component';

describe('TransactionCollecrComponent', () => {
  let component: TransactionCollecrComponent;
  let fixture: ComponentFixture<TransactionCollecrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionCollecrComponent]
    });
    fixture = TestBed.createComponent(TransactionCollecrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
