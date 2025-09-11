import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllLeavesComponent } from './view-all-leaves.component';

describe('ViewAllLeavesComponent', () => {
  let component: ViewAllLeavesComponent;
  let fixture: ComponentFixture<ViewAllLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllLeavesComponent],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
