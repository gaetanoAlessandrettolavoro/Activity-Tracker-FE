import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostaNuovaPasswordComponent } from './imposta-nuova-password.component';

describe('ImpostaNuovaPasswordComponent', () => {
  let component: ImpostaNuovaPasswordComponent;
  let fixture: ComponentFixture<ImpostaNuovaPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpostaNuovaPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpostaNuovaPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
