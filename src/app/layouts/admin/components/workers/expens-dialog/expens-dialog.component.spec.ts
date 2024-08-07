import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensDialogComponent } from './expens-dialog.component';

describe('ExpensDialogComponent', () => {
  let component: ExpensDialogComponent;
  let fixture: ComponentFixture<ExpensDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensDialogComponent]
    });
    fixture = TestBed.createComponent(ExpensDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
