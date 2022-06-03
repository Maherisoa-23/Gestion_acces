import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageRegisterComponent } from './pointage-register.component';

describe('PointageRegisterComponent', () => {
  let component: PointageRegisterComponent;
  let fixture: ComponentFixture<PointageRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointageRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
