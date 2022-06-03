import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockingScheduleComponent } from './clocking-schedule.component';

describe('ClockingScheduleComponent', () => {
  let component: ClockingScheduleComponent;
  let fixture: ComponentFixture<ClockingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockingScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
