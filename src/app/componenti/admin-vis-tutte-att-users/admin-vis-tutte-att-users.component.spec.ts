import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisTutteAttUsersComponent } from './admin-vis-tutte-att-users.component';

describe('AdminVisTutteAttUsersComponent', () => {
  let component: AdminVisTutteAttUsersComponent;
  let fixture: ComponentFixture<AdminVisTutteAttUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVisTutteAttUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVisTutteAttUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
