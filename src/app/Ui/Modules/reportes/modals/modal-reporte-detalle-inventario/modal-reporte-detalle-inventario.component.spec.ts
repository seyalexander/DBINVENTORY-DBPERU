import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReporteDetalleInventarioComponent } from './modal-reporte-detalle-inventario.component';

describe('ModalReporteDetalleInventarioComponent', () => {
  let component: ModalReporteDetalleInventarioComponent;
  let fixture: ComponentFixture<ModalReporteDetalleInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReporteDetalleInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalReporteDetalleInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
