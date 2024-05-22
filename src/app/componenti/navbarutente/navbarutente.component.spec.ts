import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarutenteComponent } from './navbarutente.component';

describe('NavbarutenteComponent', () => {
  let component: NavbarutenteComponent;
  let fixture: ComponentFixture<NavbarutenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarutenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarutenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
