import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReporteIndividualDataComponent } from './dashboard-reporte-individual-data.component';

describe('DashboardReporteIndividualDataComponent', () => {
  let component: DashboardReporteIndividualDataComponent;
  let fixture: ComponentFixture<DashboardReporteIndividualDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReporteIndividualDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardReporteIndividualDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
