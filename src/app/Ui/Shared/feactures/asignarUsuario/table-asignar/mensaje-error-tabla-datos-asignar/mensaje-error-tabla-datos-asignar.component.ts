import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mensaje-error-tabla-datos-asignar',
  standalone: true,
  imports: [],
  templateUrl: './mensaje-error-tabla-datos-asignar.component.html',
  styleUrl: './mensaje-error-tabla-datos-asignar.component.css'
})
export class MensajeErrorTablaDatosAsignarComponent {
  @Output() recargar = new EventEmitter<void>()

  recargarPagina() {
    this.recargar.emit()
  }
}
