import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttivitaRecentiUtenteComponent } from './attivita-recenti-utente.component';

describe('AttivitaRecentiUtenteComponent', () => {
  let component: AttivitaRecentiUtenteComponent;
  let fixture: ComponentFixture<AttivitaRecentiUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttivitaRecentiUtenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttivitaRecentiUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
