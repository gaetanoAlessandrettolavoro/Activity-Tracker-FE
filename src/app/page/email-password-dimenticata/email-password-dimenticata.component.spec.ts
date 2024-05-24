import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPasswordDimenticataComponent } from './email-password-dimenticata.component';

describe('EmailPasswordDimenticataComponent', () => {
  let component: EmailPasswordDimenticataComponent;
  let fixture: ComponentFixture<EmailPasswordDimenticataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailPasswordDimenticataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailPasswordDimenticataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
