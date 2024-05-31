import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvUomsComponent } from './inv-uoms.component';

describe('InvUomsComponent', () => {
  let component: InvUomsComponent;
  let fixture: ComponentFixture<InvUomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvUomsComponent]
    });
    fixture = TestBed.createComponent(InvUomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
