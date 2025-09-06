import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyEmployeeLeaveComponent } from './apply-employee-leave.component';

describe('ApplyEmployeeLeaveComponent', () => {
  let component: ApplyEmployeeLeaveComponent;
  let fixture: ComponentFixture<ApplyEmployeeLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyEmployeeLeaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyEmployeeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
