import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeavesTable } from './user-leaves-table';

describe('UserLeavesTable', () => {
  let component: UserLeavesTable;
  let fixture: ComponentFixture<UserLeavesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLeavesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLeavesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
