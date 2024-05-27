import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskCreationComponent } from './user-task-creation.component';

describe('UserTaskCreationComponent', () => {
  let component: UserTaskCreationComponent;
  let fixture: ComponentFixture<UserTaskCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTaskCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTaskCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
