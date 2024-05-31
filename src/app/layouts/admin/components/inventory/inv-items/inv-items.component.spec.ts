import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvItemsComponent } from './inv-items.component';

describe('InvItemsComponent', () => {
  let component: InvItemsComponent;
  let fixture: ComponentFixture<InvItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvItemsComponent]
    });
    fixture = TestBed.createComponent(InvItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
