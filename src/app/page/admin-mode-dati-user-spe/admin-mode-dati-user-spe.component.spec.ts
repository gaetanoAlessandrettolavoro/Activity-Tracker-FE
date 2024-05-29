import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModeDatiUserSpeComponent } from './admin-mode-dati-user-spe.component';

describe('AdminModeDatiUserSpeComponent', () => {
  let component: AdminModeDatiUserSpeComponent;
  let fixture: ComponentFixture<AdminModeDatiUserSpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModeDatiUserSpeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminModeDatiUserSpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
