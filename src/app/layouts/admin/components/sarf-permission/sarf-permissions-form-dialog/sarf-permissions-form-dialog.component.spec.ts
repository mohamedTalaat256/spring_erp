import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarfPermissionsFormDialogComponent } from './sarf-permissions-form-dialog.component';

describe('SarfPermissionsFormDialogComponent', () => {
  let component: SarfPermissionsFormDialogComponent;
  let fixture: ComponentFixture<SarfPermissionsFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SarfPermissionsFormDialogComponent]
    });
    fixture = TestBed.createComponent(SarfPermissionsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
