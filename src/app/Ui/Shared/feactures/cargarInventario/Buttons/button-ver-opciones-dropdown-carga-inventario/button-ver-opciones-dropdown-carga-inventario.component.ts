import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'button-ver-opciones-dropdown-carga-inventario',
  standalone: true,
  imports: [],
  templateUrl: './button-ver-opciones-dropdown-carga-inventario.component.html',
  styleUrl: './button-ver-opciones-dropdown-carga-inventario.component.css'
})
export class ButtonVerOpcionesDropdownCargaInventarioComponent {

  @Output() funcionEmitida = new EventEmitter<Function>();

  abrirListaOpciones() {
    this.funcionEmitida.emit();
  }
}
