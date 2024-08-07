import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownQualificaComponent } from './dropdown-qualifica.component';

describe('DropdownQualificaComponent', () => {
  let component: DropdownQualificaComponent;
  let fixture: ComponentFixture<DropdownQualificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownQualificaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownQualificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
