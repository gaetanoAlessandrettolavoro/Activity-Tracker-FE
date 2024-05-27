import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityButtonComponent } from './edit-activity-button.component';

describe('EditActivityComponent', () => {
  let component: EditActivityButtonComponent;
  let fixture: ComponentFixture<EditActivityButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditActivityButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditActivityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
