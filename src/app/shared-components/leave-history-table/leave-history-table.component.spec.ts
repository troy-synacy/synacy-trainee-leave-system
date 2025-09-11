import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryTableComponent } from './leave-history-table.component';

describe('LeaveHistoryTableComponent', () => {
  let component: LeaveHistoryTableComponent;
  let fixture: ComponentFixture<LeaveHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveHistoryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
