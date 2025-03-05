import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInventarioAjustesPageComponent } from './detalle-inventario-ajustes-page.component';

describe('DetalleInventarioAjustesPageComponent', () => {
  let component: DetalleInventarioAjustesPageComponent;
  let fixture: ComponentFixture<DetalleInventarioAjustesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleInventarioAjustesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleInventarioAjustesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
