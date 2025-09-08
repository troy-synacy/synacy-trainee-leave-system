import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEmployeesLeaveHistoryComponent } from './manager-employees-leave-history.component';

describe('ManagerEmployeesLeaveHistoryComponent', () => {
  let component: ManagerEmployeesLeaveHistoryComponent;
  let fixture: ComponentFixture<ManagerEmployeesLeaveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerEmployeesLeaveHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerEmployeesLeaveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
