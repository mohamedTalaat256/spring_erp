import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarfPermissionDetailsFormDialogComponent } from './sarf-permission-details-form-dialog.component';

describe('SarfPermissionDetailsFormDialogComponent', () => {
  let component: SarfPermissionDetailsFormDialogComponent;
  let fixture: ComponentFixture<SarfPermissionDetailsFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SarfPermissionDetailsFormDialogComponent]
    });
    fixture = TestBed.createComponent(SarfPermissionDetailsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
