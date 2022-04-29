import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisitAdminComponent } from './list-visit-admin.component';

describe('ListVisitAdminComponent', () => {
  let component: ListVisitAdminComponent;
  let fixture: ComponentFixture<ListVisitAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVisitAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVisitAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
