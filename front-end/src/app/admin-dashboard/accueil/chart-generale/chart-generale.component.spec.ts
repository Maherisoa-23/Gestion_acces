import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGeneraleComponent } from './chart-generale.component';

describe('ChartGeneraleComponent', () => {
  let component: ChartGeneraleComponent;
  let fixture: ComponentFixture<ChartGeneraleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGeneraleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
