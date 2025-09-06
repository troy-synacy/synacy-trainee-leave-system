import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManagerLeavesComponent } from './view-manager-leaves.component';

describe('ViewManagerLeavesComponent', () => {
  let component: ViewManagerLeavesComponent;
  let fixture: ComponentFixture<ViewManagerLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewManagerLeavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewManagerLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
