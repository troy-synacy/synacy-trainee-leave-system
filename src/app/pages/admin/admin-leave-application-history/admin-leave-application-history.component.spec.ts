import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaveApplicationHistoryComponent } from './admin-leave-application-history.component';

describe('AdminLeaveApplicationHistoryComponent', () => {
  let component: AdminLeaveApplicationHistoryComponent;
  let fixture: ComponentFixture<AdminLeaveApplicationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLeaveApplicationHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeaveApplicationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
