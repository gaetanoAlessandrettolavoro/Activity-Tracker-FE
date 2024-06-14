import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActivityButtonComponent } from './delete-activity-button.component';

describe('DeleteActivityButtonComponent', () => {
  let component: DeleteActivityButtonComponent;
  let fixture: ComponentFixture<DeleteActivityButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteActivityButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteActivityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
