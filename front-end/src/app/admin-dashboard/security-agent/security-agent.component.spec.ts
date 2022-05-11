import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAgentComponent } from './security-agent.component';

describe('SecurityAgentComponent', () => {
  let component: SecurityAgentComponent;
  let fixture: ComponentFixture<SecurityAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
