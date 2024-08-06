import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleImpostazioniInquadramentoComponent } from './modale-impostazioni-inquadramento.component';

describe('ModaleImpostazioniInquadramentoComponent', () => {
  let component: ModaleImpostazioniInquadramentoComponent;
  let fixture: ComponentFixture<ModaleImpostazioniInquadramentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaleImpostazioniInquadramentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaleImpostazioniInquadramentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
