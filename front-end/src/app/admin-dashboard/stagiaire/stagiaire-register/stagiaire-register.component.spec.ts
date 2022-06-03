import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireRegisterComponent } from './stagiaire-register.component';

describe('StagiaireRegisterComponent', () => {
  let component: StagiaireRegisterComponent;
  let fixture: ComponentFixture<StagiaireRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
