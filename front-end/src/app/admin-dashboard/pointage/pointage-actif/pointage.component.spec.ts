import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageComponent } from './pointage.component';

describe('PointageComponent', () => {
  let component: PointageComponent;
  let fixture: ComponentFixture<PointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
