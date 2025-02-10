import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';

@Component({
  selector: 'detalle-carga-inventarios',
  standalone: true,
  imports: [
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

  encabezadoTable: Array<BodyDetalle> = [];
}

interface BodyDetalle {
  matColumnDef: string;
  title: string;
  dato: string;
}
