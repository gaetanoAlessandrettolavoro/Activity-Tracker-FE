import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddactivityforuserComponent } from './adminaddactivityforuser.component';

describe('AdminaddactivityforuserComponent', () => {
  let component: AdminaddactivityforuserComponent;
  let fixture: ComponentFixture<AdminaddactivityforuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminaddactivityforuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminaddactivityforuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
