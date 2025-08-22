import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInlogComponent } from './admin-inlog.component';

describe('AdminInlogComponent', () => {
  let component: AdminInlogComponent;
  let fixture: ComponentFixture<AdminInlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
