import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageEmployeeComponent } from './pointage-employee.component';

describe('PointageEmployeeComponent', () => {
  let component: PointageEmployeeComponent;
  let fixture: ComponentFixture<PointageEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointageEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
