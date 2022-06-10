import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeProfileComponent } from './vehicule-profile.component';

describe('VehiculeProfileComponent', () => {
  let component: VehiculeProfileComponent;
  let fixture: ComponentFixture<VehiculeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
