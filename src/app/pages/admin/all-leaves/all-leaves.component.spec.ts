import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AllLeavesComponent } from './all-leaves.component';
import { AllLeavesService } from './all-leaves.service';


describe('AllLeavesComponent', () => {
  let component: AllLeavesComponent;
  let fixture: ComponentFixture<AllLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllLeavesComponent],
      providers: [
        { provide: AllLeavesService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
