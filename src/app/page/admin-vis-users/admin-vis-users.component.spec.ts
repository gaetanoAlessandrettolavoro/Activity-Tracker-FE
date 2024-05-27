import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisUsersComponent } from './admin-vis-users.component';

describe('AdminVisUsersComponent', () => {
  let component: AdminVisUsersComponent;
  let fixture: ComponentFixture<AdminVisUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVisUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVisUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
