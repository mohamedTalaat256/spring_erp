import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvItemFormDialogComponent } from './inv-item-form-dialog.component';

describe('InvItemFormDialogComponent', () => {
  let component: InvItemFormDialogComponent;
  let fixture: ComponentFixture<InvItemFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvItemFormDialogComponent]
    });
    fixture = TestBed.createComponent(InvItemFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
