import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutteAttivitaComponent } from './tutte-attivita.component';

describe('TutteAttivitaComponent', () => {
  let component: TutteAttivitaComponent;
  let fixture: ComponentFixture<TutteAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutteAttivitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutteAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
