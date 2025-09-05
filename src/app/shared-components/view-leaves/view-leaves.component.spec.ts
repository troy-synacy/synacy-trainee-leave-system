import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeavesComponent } from './view-leaves.component';

describe('ViewLeavesComponent', () => {
  let component: ViewLeavesComponent;
  let fixture: ComponentFixture<ViewLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLeavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
