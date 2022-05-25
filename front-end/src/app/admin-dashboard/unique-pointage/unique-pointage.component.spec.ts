import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquePointageComponent } from './unique-pointage.component';

describe('UniquePointageComponent', () => {
  let component: UniquePointageComponent;
  let fixture: ComponentFixture<UniquePointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniquePointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquePointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
