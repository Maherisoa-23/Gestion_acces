import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireListComponent } from './stagiaire-list.component';

describe('StagiaireListComponent', () => {
  let component: StagiaireListComponent;
  let fixture: ComponentFixture<StagiaireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
