import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarattgiornaliereComponent } from './navbarattgiornaliere.component';

describe('NavbarattgiornaliereComponent', () => {
  let component: NavbarattgiornaliereComponent;
  let fixture: ComponentFixture<NavbarattgiornaliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarattgiornaliereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarattgiornaliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
