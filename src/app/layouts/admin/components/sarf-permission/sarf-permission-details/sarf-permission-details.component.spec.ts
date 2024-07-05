import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarfPermissionDetailsComponent } from './sarf-permission-details.component';

describe('SarfPermissionDetailsComponent', () => {
  let component: SarfPermissionDetailsComponent;
  let fixture: ComponentFixture<SarfPermissionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SarfPermissionDetailsComponent]
    });
    fixture = TestBed.createComponent(SarfPermissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
