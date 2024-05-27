import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisUtenteSpecificoComponent } from './admin-vis-utente-specifico.component';

describe('AdminVisUtenteSpecificoComponent', () => {
  let component: AdminVisUtenteSpecificoComponent;
  let fixture: ComponentFixture<AdminVisUtenteSpecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVisUtenteSpecificoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVisUtenteSpecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
