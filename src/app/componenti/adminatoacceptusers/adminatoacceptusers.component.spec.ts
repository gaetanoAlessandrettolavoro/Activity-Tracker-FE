import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminatoacceptusersComponent } from './adminatoacceptusers.component';

describe('AdminatoacceptusersComponent', () => {
  let component: AdminatoacceptusersComponent;
  let fixture: ComponentFixture<AdminatoacceptusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminatoacceptusersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminatoacceptusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
