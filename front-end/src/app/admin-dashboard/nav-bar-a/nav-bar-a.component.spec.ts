import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAComponent } from './nav-bar-a.component';

describe('NavBarAComponent', () => {
  let component: NavBarAComponent;
  let fixture: ComponentFixture<NavBarAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
