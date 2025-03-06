import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosService } from 'src/app/Infraestructure/driven-adapter/inventarios/inventarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'tabla-ajustes-inventario-datos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgClass,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './tabla-ajustes-inventario-datos.component.html',
  styleUrl: './tabla-ajustes-inventario-datos.component.css'
})
export class TablaAjustesInventarioDatosComponent {
  @Input() listaProductos: Array<detalleCarga> = [];
  @Input() inventarioSeleccionado: inventariosModel = {} as inventariosModel;

  dataSource = new MatTableDataSource<detalleCarga>([]);
  displayedColumns: string[] = [
    'codigoproducto',
    'codigobarra',
    'descripcionProducto',
    'stockL',
    'stockF',
    'stockresultante',
    'ajuste',
    'detalleajuste',
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['listaProductos']) {
      this.dataSource.data = this.listaProductos || [];
      console.log("INFORMACINO TABLA: ",this.dataSource.data );

    }
  }

  private readonly inventariosService = inject(InventariosService)
  guardarAjustes() {
    const ajustes = this.listaProductos
  .filter(p => (p.ajuste !== undefined && p.ajuste > 0) && (p.descripcionajuste && p.descripcionajuste.trim() !== ''));

    if (ajustes.length === 0) {
      console.warn('No hay ajustes para guardar.');
      return;
    }

    const batchSize = 300;
    const totalRegistros = ajustes.length;
    let registrosProcesados = 0;
    const totalBatches = Math.ceil(totalRegistros / batchSize);
    console.log(ajustes.length);


    Swal.fire({
      title: 'Guardando ajustes...',
      html: `<b>Iniciando carga de ajustes...</b>`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const enviarLote = (loteIndex: number) => {
      if (loteIndex >= totalBatches) {
        Swal.close();
        console.log("✅ Todos los lotes enviados correctamente.");
        return;
      }

      const inicio = loteIndex * batchSize;
      const fin = Math.min(inicio + batchSize, totalRegistros);
      const lote = ajustes.slice(inicio, fin);

      const cabeceraAjuste = {
        idcarga: this.inventarioSeleccionado.idcarga,
        rucempresa: this.inventarioSeleccionado.rucempresa,
        detalle: lote
      };

      this.inventariosService.newAjusteInventario(cabeceraAjuste).subscribe({
        next: (response) => {
          registrosProcesados += lote.length;

          Swal.update({
            html: `<b>Guardando registros ${registrosProcesados} de ${totalRegistros}</b>`,
          });

          setTimeout(() => enviarLote(loteIndex + 1), 100);
        },
        error: (err) => {
          Swal.close();
        },
      });
    };

    enviarLote(0);
  }


}




