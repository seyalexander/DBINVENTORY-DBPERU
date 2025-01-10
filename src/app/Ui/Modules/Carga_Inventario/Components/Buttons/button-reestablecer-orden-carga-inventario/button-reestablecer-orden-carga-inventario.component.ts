import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-reestablecer-orden-carga-inventario',
  standalone: true,
  imports: [],
  templateUrl: './button-reestablecer-orden-carga-inventario.component.html',
  styleUrl: './button-reestablecer-orden-carga-inventario.component.css',
})
export class ButtonReestablecerOrdenCargaInventarioComponent {
  @Input() ordenar: string = '';
  @Output() ordenarDatos = new EventEmitter<{ ordenar: string }>();

  BtnOrdenar() {
    this.ordenarDatos.emit({ ordenar: this.ordenar });
  }
}
