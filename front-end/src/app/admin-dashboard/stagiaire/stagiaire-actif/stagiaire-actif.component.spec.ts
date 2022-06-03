import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireActifComponent } from './stagiaire-actif.component';

describe('StagiaireActifComponent', () => {
  let component: StagiaireActifComponent;
  let fixture: ComponentFixture<StagiaireActifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireActifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireActifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
