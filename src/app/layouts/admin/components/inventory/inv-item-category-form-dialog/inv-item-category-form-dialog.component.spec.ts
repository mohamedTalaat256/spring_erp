import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvItemCategoryFormDialogComponent } from './inv-item-category-form-dialog.component';

describe('InvItemCategoryFormDialogComponent', () => {
  let component: InvItemCategoryFormDialogComponent;
  let fixture: ComponentFixture<InvItemCategoryFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvItemCategoryFormDialogComponent]
    });
    fixture = TestBed.createComponent(InvItemCategoryFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
