import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManagerOwnLeavesComponent } from './view-manager-own-leaves';

describe('ViewManagerOwnLeaves', () => {
  let component: ViewManagerOwnLeavesComponent;
  let fixture: ComponentFixture<ViewManagerOwnLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewManagerOwnLeavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewManagerOwnLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
