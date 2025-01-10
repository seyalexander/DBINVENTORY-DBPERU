import { Component } from '@angular/core';
import { GrupoButtonsHeaderCargaDatosComponent } from '../../Buttons/grupo-buttons-header-carga-datos/grupo-buttons-header-carga-datos.component';

@Component({
  selector: 'header-table-carga-inventario',
  standalone: true,
  imports: [
    GrupoButtonsHeaderCargaDatosComponent
  ],
  templateUrl: './header-table-carga-inventario.component.html',
  styleUrl: './header-table-carga-inventario.component.css'
})
export class HeaderTableCargaInventarioComponent {

}
