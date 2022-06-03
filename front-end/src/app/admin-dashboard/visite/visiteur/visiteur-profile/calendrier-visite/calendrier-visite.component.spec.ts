import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierVisiteComponent } from './calendrier-visite.component';

describe('CalendrierVisiteComponent', () => {
  let component: CalendrierVisiteComponent;
  let fixture: ComponentFixture<CalendrierVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierVisiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
