import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAttrecentiComponent } from './navbar-attrecenti.component';

describe('NavbarAttrecentiComponent', () => {
  let component: NavbarAttrecentiComponent;
  let fixture: ComponentFixture<NavbarAttrecentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAttrecentiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarAttrecentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
