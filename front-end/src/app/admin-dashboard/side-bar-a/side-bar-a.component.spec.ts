import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarAComponent } from './side-bar-a.component';

describe('SideBarAComponent', () => {
  let component: SideBarAComponent;
  let fixture: ComponentFixture<SideBarAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
