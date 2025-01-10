import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { ButtonCerrarComponent } from 'src/app/Ui/Shared/Components/buttons/button-cerrar/button-cerrar.component';

@Component({
  selector: 'detalle-carga-inventarios',
  standalone: true,
  imports: [
    ButtonCerrarComponent,
    NgxPaginationModule
  ],
  templateUrl: './detalle-carga-inventarios.component.html',
  styleUrl: './detalle-carga-inventarios.component.css'
})
export class DetalleCargaInventariosComponent {
  @Input() citaSeleccionada: inventariosModel = {} as inventariosModel;
  @Input() detalleProductos: Array<detalleCarga> = []
  @Input() cantidadInventarios: number = 0

  @Output() changePage = new EventEmitter<number>();

  p: number = 1;
  collection: Array<inventariosModel> = [];

  paginatedProductos: Array<detalleCarga> = [];
  currentPageProductos: number = 1;
  itemsPerPageProductos: number = 5;
  totalPagesProductos: number = 0;
  cantidadLlamarSoporte: number = 0;
}
