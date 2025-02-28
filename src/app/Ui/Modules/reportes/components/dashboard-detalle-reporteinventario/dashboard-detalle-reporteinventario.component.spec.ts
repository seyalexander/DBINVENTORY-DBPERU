import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetalleReporteinventarioComponent } from './dashboard-detalle-reporteinventario.component';

describe('DashboardDetalleReporteinventarioComponent', () => {
  let component: DashboardDetalleReporteinventarioComponent;
  let fixture: ComponentFixture<DashboardDetalleReporteinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDetalleReporteinventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDetalleReporteinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
