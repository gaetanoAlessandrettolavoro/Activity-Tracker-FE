import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivityComponent } from './daily-activity.component';

describe('DailyActivityComponent', () => {
  let component: DailyActivityComponent;
  let fixture: ComponentFixture<DailyActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
