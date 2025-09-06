import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeOwnLeaveComponent } from './view-employee-own-leave.component';

describe('ViewEmployeeOwnLeaveComponent', () => {
  let component: ViewEmployeeOwnLeaveComponent;
  let fixture: ComponentFixture<ViewEmployeeOwnLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEmployeeOwnLeaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmployeeOwnLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
