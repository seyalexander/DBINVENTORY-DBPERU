import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonDescargarPlantillaComponent } from '../button-descargar-plantilla/button-descargar-plantilla.component';
import { ButtonNuevoInventarioComponent } from '../button-nuevo-inventario/button-nuevo-inventario.component';
import { ButtonReestablecerOrdenCargaInventarioComponent } from '../button-reestablecer-orden-carga-inventario/button-reestablecer-orden-carga-inventario.component';

@Component({
  selector: 'grupo-buttons-header-carga-datos',
  standalone: true,
  imports: [
    ButtonDescargarPlantillaComponent,
    ButtonNuevoInventarioComponent,
    ButtonReestablecerOrdenCargaInventarioComponent,
  ],
  templateUrl: './grupo-buttons-header-carga-datos.component.html',
  styleUrl: './grupo-buttons-header-carga-datos.component.css',
})
export class GrupoButtonsHeaderCargaDatosComponent {
  @Input() ordenar: string = '';
  @Output() ordenarDatos = new EventEmitter<{ ordenar: string }>();

  BtnOrdenar() {
    this.ordenarDatos.emit({ ordenar: this.ordenar });
  }
}
