import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExcelComponent } from './upload-excel.component';

describe('UploadExcelComponent', () => {
  let component: UploadExcelComponent;
  let fixture: ComponentFixture<UploadExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
