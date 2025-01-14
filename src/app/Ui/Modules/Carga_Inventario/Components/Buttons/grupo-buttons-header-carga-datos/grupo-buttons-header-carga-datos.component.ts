import { Component } from '@angular/core';
import { ButtonDescargarPlantillaComponent } from '../button-descargar-plantilla/button-descargar-plantilla.component';
import { ButtonNuevoInventarioComponent } from '../button-nuevo-inventario/button-nuevo-inventario.component';

@Component({
  selector: 'grupo-buttons-header-carga-datos',
  standalone: true,
  imports: [
    ButtonDescargarPlantillaComponent,
    ButtonNuevoInventarioComponent,
  ],
  templateUrl: './grupo-buttons-header-carga-datos.component.html',
  styleUrl: './grupo-buttons-header-carga-datos.component.css',
})
export class GrupoButtonsHeaderCargaDatosComponent {

}
