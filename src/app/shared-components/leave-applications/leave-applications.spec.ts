import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplications } from './leave-applications';

describe('LeaveApplications', () => {
  let component: LeaveApplications;
  let fixture: ComponentFixture<LeaveApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveApplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveApplications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
