import { TestBed } from '@angular/core/testing';

import { ModificAttivitàAdminVisUtenteSpecificoService } from './modific-attività-admin-vis-utente-specifico.service';

describe('ModificAttivitàAdminVisUtenteSpecificoService', () => {
  let service: ModificAttivitàAdminVisUtenteSpecificoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificAttivitàAdminVisUtenteSpecificoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
