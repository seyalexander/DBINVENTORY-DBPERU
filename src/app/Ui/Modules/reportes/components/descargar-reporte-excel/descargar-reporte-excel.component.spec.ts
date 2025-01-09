import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarReporteExcelComponent } from './descargar-reporte-excel.component';

describe('DescargarReporteExcelComponent', () => {
  let component: DescargarReporteExcelComponent;
  let fixture: ComponentFixture<DescargarReporteExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescargarReporteExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescargarReporteExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
