import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvUomsFormDialogComponent } from './inv-uoms-form-dialog.component';

describe('InvUomsFormDialogComponent', () => {
  let component: InvUomsFormDialogComponent;
  let fixture: ComponentFixture<InvUomsFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvUomsFormDialogComponent]
    });
    fixture = TestBed.createComponent(InvUomsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
