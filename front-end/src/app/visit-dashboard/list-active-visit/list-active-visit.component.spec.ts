import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveVisitComponent } from './list-active-visit.component';

describe('ListActiveVisitComponent', () => {
  let component: ListActiveVisitComponent;
  let fixture: ComponentFixture<ListActiveVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActiveVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiveVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
