import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireProfileComponent } from './stagiaire-profile.component';

describe('StagiaireProfileComponent', () => {
  let component: StagiaireProfileComponent;
  let fixture: ComponentFixture<StagiaireProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
