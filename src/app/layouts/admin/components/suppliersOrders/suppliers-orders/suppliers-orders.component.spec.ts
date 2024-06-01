import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersOrdersComponent } from './suppliers-orders.component';

describe('SuppliersOrdersComponent', () => {
  let component: SuppliersOrdersComponent;
  let fixture: ComponentFixture<SuppliersOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersOrdersComponent]
    });
    fixture = TestBed.createComponent(SuppliersOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
