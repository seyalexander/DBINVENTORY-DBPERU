import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';

@Component({
  selector: 'desing-page-tabla-ajustados',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgClass
  ],
  templateUrl: './desing-page-tabla-ajustados.component.html',
  styleUrl: './desing-page-tabla-ajustados.component.css'
})
export class DesingPageTablaAjustadosComponent {
  @Input() listaProductos: Array<detalleCarga> = [];
  @Input() columnasSeleccionadas: string[] = [];

  dataSource = new MatTableDataSource<detalleCarga>([]);
  displayedColumns: string[] = [
    'codigoproducto',
    'codigobarra',
    'descripcionProducto',
    'unidad',
    'stockL',
    'stockF',
    'stockresultante',
    'ajuste',
    'descripcionajuste'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.updateColumns();
    console.log(this.listaProductos.length);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['listaProductos'] || changes['columnasSeleccionadas']) {
      this.updateColumns();
      this.dataSource.data = this.listaProductos || [];

      this.cdr.detectChanges();
    }
  }



  constructor(private cdr: ChangeDetectorRef) { }
  updateColumns() {

    // Si no hay columnas seleccionadas, establece las predeterminadas
    // if (!this.columnasSeleccionadas || this.columnasSeleccionadas.length === 0) {
    //   this.columnasSeleccionadas = [
    //     'codigoproducto',
    //     'codigobarra',
    //     'descripcionProducto',
    //     'unidad',
    //     'stockL',
    //     'stockF',
    //     'stockresultante',
    //     'ajuste'
    //   ];
    // }

    // this.displayedColumns = [...this.columnasSeleccionadas];
  }
}
