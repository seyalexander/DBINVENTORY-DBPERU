import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarReportePdfComponent } from './descargar-reporte-pdf.component';

describe('DescargarReportePdfComponent', () => {
  let component: DescargarReportePdfComponent;
  let fixture: ComponentFixture<DescargarReportePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescargarReportePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescargarReportePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
