import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeErrorTablaDatosAsignarComponent } from './mensaje-error-tabla-datos-asignar.component';

describe('MensajeErrorTablaDatosAsignarComponent', () => {
  let component: MensajeErrorTablaDatosAsignarComponent;
  let fixture: ComponentFixture<MensajeErrorTablaDatosAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeErrorTablaDatosAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeErrorTablaDatosAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
