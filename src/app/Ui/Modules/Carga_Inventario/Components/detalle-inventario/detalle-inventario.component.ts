import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inventariosModel } from '../../../../../Domain/models/inventarios/inventarios.models';
import { detalleCarga } from '../../../../../Domain/models/cargaDatos/cargaDatos.model';
import { ButtonCerrarComponent } from 'src/app/Ui/Shared/Components/molecules/button-cerrar/button-cerrar.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'detalle-inventario',
  standalone: true,
  imports: [
    ButtonCerrarComponent,
    NgxPaginationModule
  ],
  templateUrl: './detalle-inventario.component.html',
  styleUrl: './detalle-inventario.component.css'
})
export class DetalleInventarioComponent {
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
