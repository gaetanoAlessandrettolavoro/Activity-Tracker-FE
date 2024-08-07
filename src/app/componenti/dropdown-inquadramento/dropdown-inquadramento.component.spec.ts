import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownInquadramentoComponent } from './dropdown-inquadramento.component';

describe('DropdownInquadramentoComponent', () => {
  let component: DropdownInquadramentoComponent;
  let fixture: ComponentFixture<DropdownInquadramentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownInquadramentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownInquadramentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
