import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDailyActivityComponent } from './no-daily-activity.component';

describe('NoDailyActivityComponent', () => {
  let component: NoDailyActivityComponent;
  let fixture: ComponentFixture<NoDailyActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDailyActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoDailyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
