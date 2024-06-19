import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownUserComponent } from './drop-down-user.component';

describe('DropDownUserComponent', () => {
  let component: DropDownUserComponent;
  let fixture: ComponentFixture<DropDownUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropDownUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
