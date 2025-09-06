import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyManagerLeave } from './apply-manager-leave';

describe('ApplyManagerLeave', () => {
  let component: ApplyManagerLeave;
  let fixture: ComponentFixture<ApplyManagerLeave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyManagerLeave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyManagerLeave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
