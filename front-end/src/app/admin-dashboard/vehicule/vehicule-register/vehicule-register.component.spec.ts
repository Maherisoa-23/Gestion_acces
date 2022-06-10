import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeRegisterComponent } from './vehicule-register.component';

describe('VehiculeRegisterComponent', () => {
  let component: VehiculeRegisterComponent;
  let fixture: ComponentFixture<VehiculeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
