import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GrupoButtonsHeaderCargaDatosComponent } from '../../Buttons/grupo-buttons-header-carga-datos/grupo-buttons-header-carga-datos.component';
import { HeaderTableTitleComponent } from '@modules/configuration/Empresas/components/header/header-table-title/header-table-title.component';

@Component({
  selector: 'header-table-carga-inventario',
  standalone: true,
  imports: [
    GrupoButtonsHeaderCargaDatosComponent,
    HeaderTableTitleComponent
  ],
  templateUrl: './header-table-carga-inventario.component.html',
  styleUrl: './header-table-carga-inventario.component.css'
})
export class HeaderTableCargaInventarioComponent {
  @Input() ordenar: string = '';
  @Output() ordenarDatos = new EventEmitter<{ ordenar: string }>();

  BtnOrdenar() {
    this.ordenarDatos.emit({ ordenar: this.ordenar });
  }
}
