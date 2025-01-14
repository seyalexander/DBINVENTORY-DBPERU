import { Component } from '@angular/core';

@Component({
  selector: 'mensaje-error-lista',
  standalone: true,
  imports: [],
  templateUrl: './mensaje-error-lista.component.html',
  styleUrl: './mensaje-error-lista.component.css'
})
export class MensajeErrorListaComponent {
  recargarPagina() {
    window.location.reload();
  }
}
