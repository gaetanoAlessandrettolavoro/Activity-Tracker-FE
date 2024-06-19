import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChartComponent } from './basic-chart.component';

describe('BasicChartComponent', () => {
  let component: BasicChartComponent;
  let fixture: ComponentFixture<BasicChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
