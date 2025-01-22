import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { ButtonCerrarComponent } from 'src/app/Ui/Shared/Components/buttons/button-cerrar/button-cerrar.component';

@Component({
  selector: 'detalle-carga-inventarios',
  standalone: true,
  imports: [
    ButtonCerrarComponent,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './detalle-carga-inventarios.component.html',
  styleUrl: './detalle-carga-inventarios.component.css'
})
export class DetalleCargaInventariosComponent {

  displayedColumns: string[] = [
    'almacen',
    'sucursal',
    'zona',
    'pasillo',
    'rack',
    'ubicacion',
    'esagrupado',
    'codgrupo',
    'codigoproducto',
    'codigobarra',
    'descripcionProducto',
    'unidad',
    'stockL'
  ];

  @Input() detalleProductos: Array<detalleCarga> = []
  dataSource = new MatTableDataSource<detalleCarga>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['detalleProductos']) {
      this.dataSource.data = this.detalleProductos || [];
    }
  }




  @Input() citaSeleccionada: inventariosModel = {} as inventariosModel;

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
