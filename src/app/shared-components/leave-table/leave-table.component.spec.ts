import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTableComponent } from './leave-table.component';

describe('LeaveTableComponent', () => {
  let component: LeaveTableComponent;
  let fixture: ComponentFixture<LeaveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
