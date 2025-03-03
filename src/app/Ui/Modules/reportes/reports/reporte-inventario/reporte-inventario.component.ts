import { Component, inject, ViewChild } from '@angular/core';
import { inventariosModel } from '../../../../../Domain/models/inventarios/inventarios.models';
import { InventariosByIdUseCases } from '../../../../../Domain/use-case/inventarios/get-inventarioById-useCase';
import { detalleCarga } from '../../../../../Domain/models/cargaDatos/cargaDatos.model';
import { Subscription } from 'rxjs';
import { InventariosUseCases } from '../../../../../Domain/use-case/inventarios/get-inventarios-useCase';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { DesignReportInventarioComponent } from '@modules/reportes/components/design-reporte/design-report-inventario/design-report-inventario.component';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';
import { InventarioDetallesUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioDetalle-usecase';
import { DetalleCargaInventariosComponent } from '@modules/Carga_Inventario/Page/detalle-carga-inventarios/detalle-carga-inventarios.component';
import { TdEstado1Component } from 'src/app/Ui/Shared/Components/tables/td-estado-1/td-estado-1.component';
import { TdEstado2Component } from 'src/app/Ui/Shared/Components/tables/td-estado-2/td-estado-2.component';
import { TdEstado3Component } from 'src/app/Ui/Shared/Components/tables/td-estado-3/td-estado-3.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RequestInventarioByFiltros } from 'src/app/Domain/models/inventarios/requestInventariosByFiltros.model';
import { InventariosByFiltrosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventariosByFiltros-use-case';
import { CommonModule } from '@angular/common';
import { DashboardDetalleReporteinventarioComponent } from '@modules/reportes/components/dashboard-detalle-reporteinventario/dashboard-detalle-reporteinventario.component';

@Component({
  selector: 'reporte-inventario',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIcon,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxPaginationModule,
    DesignReportInventarioComponent,
    DetalleCargaInventariosComponent,
    TdEstado1Component,
    TdEstado2Component,
    TdEstado3Component,
    CommonModule,
    DashboardDetalleReporteinventarioComponent
  ],
  templateUrl: './reporte-inventario.component.html',
  styleUrl: './reporte-inventario.component.css',
})
export class ReporteInventarioComponent {
  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------

  cantidadListaProductos: number = 0;
  cantidadDatosInventarioLista: number = 0;
  mostrarRefrescoPagina: boolean = true;

  datosInventario: inventariosModel = {} as inventariosModel;
  InventarioSeleccionado: inventariosModel = {} as inventariosModel;
  selectedItem!: { rucempresa: string; idcarga: string };

  DetalleInventarioSeleccionado: Array<inventariosModel> = [];
  datosInventarioslista: Array<inventariosModel> = [];
  listaProductos: Array<detalleCarga> = [];

  // ---------------------------------------------------------------------------------------
  // INJECCIÓN SERVICIOS
  // ---------------------------------------------------------------------------------------
  private inventarioSubscription: Subscription | undefined;
  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly listaInventarios = inject(InventariosUseCases);
  private readonly listDetalle = inject(InventarioDetallesUseCases);

  // ---------------------------------------------------------------------------------------
  // FUNCIÓN PRINCIPAL
  // ---------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.listarInventarios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ---------------------------------------------------------------------------------------
  // INVENTARIO SELECCIONADO PARA SU EXPORTACIÓN
  // ---------------------------------------------------------------------------------------
  inventarioSeleccionado(rucempresa: string, idcarga: number) {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
        this.InventarioSeleccionado = response;
      }
    );
  }


  inventarioSeleccionadoPDF(rucempresa: string, idcarga: number) {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
        this.InventarioSeleccionado = response;
        this.ObtenerDetalleInventariosPDF(response.rucempresa, response.idcarga)


      }
    );
  }

  ObtenerDetalleInventariosPDF(rucempresa: string, idcarga: number) {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.listDetalle
      .getDetalleInventario(reqDatos)
      .subscribe((response: detalleCarga[]) => {
        this.listaProductos = response;
        this.cantidadListaProductos = response.length;
      });
  }



  // ---------------------------------------------------------------------------------------
  // OBTENCIÓN DATOS DEL INVENTARIO SELECCIOADO PARA MOSTRAR SU DETALLE
  // ---------------------------------------------------------------------------------------
  ObtenerDetalleInventarios(rucempresa: string, idcarga: number) {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.listDetalle
      .getDetalleInventario(reqDatos)
      .subscribe((response: detalleCarga[]) => {
        this.listaProductos = response;
        this.cantidadListaProductos = response.length;
        this.inventarioSeleccionado(rucempresa, idcarga)


      });
  }

  // ---------------------------------------------------------------------------------------
  // RECARGAR LA PÁGINA
  // ---------------------------------------------------------------------------------------
  recargarPagina() {
    window.location.reload();
  }

  // ================================================================================
  // DATOS PARA TABLA DE ANGULAR MATERIAL
  // ================================================================================
  displayedColumns: string[] = [
    'fechamodificacion',
    'descripcion',
    'cantidad',
    'usuariocreacion',
    'estado',
    'opciones'
  ];

  dataSource = new MatTableDataSource<inventariosModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // ---------------------------------------------------------------------------------------
  // LISTA DE INVENTARIOS GENERALES
  // ---------------------------------------------------------------------------------------
   private readonly listaInventariosbyfiltros = inject(InventariosByFiltrosUseCases);
  listarInventarios() {
      const estado = '2'
      const rucempresa = ''
      const reqDatos: RequestInventarioByFiltros = { rucempresa, estado };
      reqDatos.estado = estado
      reqDatos.rucempresa = rucempresa
      try {
        this.inventarioSubscription = this.listaInventariosbyfiltros
          .getInventariosByFiltros(reqDatos)
          .subscribe({
            next: (response: inventariosModel[]) => {
              if (Array.isArray(response)) {
                this.datosInventarioslista = response;
                this.dataSource.data = response;

              } else {
                this.mostrarMensajeError('DATOS NO VÁLIDOS', `${response}`);
                this.datosInventarioslista = [];
                this.cantidadDatosInventarioLista = 0;
              }
            },
            error: (error) => {
              this.mostrarMensajeError(
                error.name,
                'Verifique la conexión con el API y recargue el listado.'
              );
              this.datosInventarioslista = [];
              this.cantidadDatosInventarioLista = 0;
            },
          });
      } catch (err) {
        this.mostrarMensajeError(
          'Error inesperado',
          `Error en listarInventarios: ${err}`
        );
      }
    }

     mostrarMensajeError(titulo: string, mensaje: string): void {
        Swal.fire({
          icon: 'error',
          title: titulo,
          text: mensaje,
        });
      }

  // ---------------------------------------------------------------------------------------
  // MODALES DE LOS MENSAJES ALERTS - SWEET ALERT
  // ---------------------------------------------------------------------------------------
  respuestaInventariosNoValidos(response: any): void {
    Swal.fire({
      icon: 'error',
      title: 'DATOS NO VÁLIDOS',
      text: `${response}`,
    });
  }

  respuestaInventariosSinAcceso(response: any): void {
    Swal.fire({
      icon: 'error',
      title: `${response}`,
      text: 'verifique que la conexión del api y recargue el listado',
    }).then((respuesta) => { });
  }

  respuestaInventariosErrorInesperado(response: any): void {
    Swal.fire({
      icon: 'error',
      title: `Error inesperado en listarInventarios`,
      text: `${response}`,
    });
  }

  // ---------------------------------------------------------------------------------------
  // DESTRUCCIÓN DE SUBSCRIPCIONES
  // ---------------------------------------------------------------------------------------
  ngOnDestroy(): void {
    if (this.inventarioSubscription) {
      this.inventarioSubscription.unsubscribe();
    }
  }
}
