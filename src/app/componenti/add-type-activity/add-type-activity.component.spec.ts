import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeActivityComponent } from './add-type-activity.component';

describe('AddTypeActivityComponent', () => {
  let component: AddTypeActivityComponent;
  let fixture: ComponentFixture<AddTypeActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTypeActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTypeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
