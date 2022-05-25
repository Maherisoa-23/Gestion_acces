import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurProfileComponent } from './visiteur-profile.component';

describe('VisiteurProfileComponent', () => {
  let component: VisiteurProfileComponent;
  let fixture: ComponentFixture<VisiteurProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteurProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
