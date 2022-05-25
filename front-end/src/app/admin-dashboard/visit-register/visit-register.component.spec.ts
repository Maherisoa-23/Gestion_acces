import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitRegisterComponent } from './visit-register.component';

describe('VisitRegisterComponent', () => {
  let component: VisitRegisterComponent;
  let fixture: ComponentFixture<VisitRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
