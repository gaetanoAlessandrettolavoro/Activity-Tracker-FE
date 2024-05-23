import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarimpadminComponent } from './navbarimpadmin.component';

describe('NavbarimpadminComponent', () => {
  let component: NavbarimpadminComponent;
  let fixture: ComponentFixture<NavbarimpadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarimpadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarimpadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
