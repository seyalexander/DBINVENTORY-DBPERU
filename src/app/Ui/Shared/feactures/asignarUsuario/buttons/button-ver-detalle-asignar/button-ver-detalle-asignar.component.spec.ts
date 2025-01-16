import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonVerDetalleAsignarComponent } from './button-ver-detalle-asignar.component';

describe('ButtonVerDetalleAsignarComponent', () => {
  let component: ButtonVerDetalleAsignarComponent;
  let fixture: ComponentFixture<ButtonVerDetalleAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonVerDetalleAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonVerDetalleAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
