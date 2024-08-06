import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleImpostazioniQualificaComponent } from './modale-impostazioni-qualifica.component';

describe('ModaleImpostazioniQualificaComponent', () => {
  let component: ModaleImpostazioniQualificaComponent;
  let fixture: ComponentFixture<ModaleImpostazioniQualificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaleImpostazioniQualificaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaleImpostazioniQualificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
