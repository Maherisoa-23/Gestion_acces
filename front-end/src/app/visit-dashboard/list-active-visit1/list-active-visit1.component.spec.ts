import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveVisit1Component } from './list-active-visit1.component';

describe('ListActiveVisit1Component', () => {
  let component: ListActiveVisit1Component;
  let fixture: ComponentFixture<ListActiveVisit1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActiveVisit1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiveVisit1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
