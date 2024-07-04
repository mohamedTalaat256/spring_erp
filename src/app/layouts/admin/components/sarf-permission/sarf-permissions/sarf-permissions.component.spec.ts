import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarfPermissionsComponent } from './sarf-permissions.component';

describe('SarfPermissionsComponent', () => {
  let component: SarfPermissionsComponent;
  let fixture: ComponentFixture<SarfPermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SarfPermissionsComponent]
    });
    fixture = TestBed.createComponent(SarfPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
