import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsReporteComponent } from './stats-reporte.component';

describe('StatsReporteComponent', () => {
  let component: StatsReporteComponent;
  let fixture: ComponentFixture<StatsReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsReporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
