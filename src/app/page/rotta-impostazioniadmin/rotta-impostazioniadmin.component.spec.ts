import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RottaImpostazioniadminComponent } from './rotta-impostazioniadmin.component';

describe('RottaImpostazioniadminComponent', () => {
  let component: RottaImpostazioniadminComponent;
  let fixture: ComponentFixture<RottaImpostazioniadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RottaImpostazioniadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RottaImpostazioniadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
