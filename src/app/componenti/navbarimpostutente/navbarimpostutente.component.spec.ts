import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarimpostutenteComponent } from './navbarimpostutente.component';

describe('NavbarimpostutenteComponent', () => {
  let component: NavbarimpostutenteComponent;
  let fixture: ComponentFixture<NavbarimpostutenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarimpostutenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarimpostutenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
