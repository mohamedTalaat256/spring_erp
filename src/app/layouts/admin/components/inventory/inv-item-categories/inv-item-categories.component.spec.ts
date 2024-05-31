import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvItemCategoriesComponent } from './inv-item-categories.component';

describe('InvItemCategoriesComponent', () => {
  let component: InvItemCategoriesComponent;
  let fixture: ComponentFixture<InvItemCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvItemCategoriesComponent]
    });
    fixture = TestBed.createComponent(InvItemCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
