import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFormDialogComponent } from './store-form-dialog.component';

describe('StoreFormDialogComponent', () => {
  let component: StoreFormDialogComponent;
  let fixture: ComponentFixture<StoreFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFormDialogComponent]
    });
    fixture = TestBed.createComponent(StoreFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
