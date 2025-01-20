import { Component, inject, Input } from '@angular/core';
import { inventariosModel } from '../../../../../Domain/models/inventarios/inventarios.models';
import { InventariosByIdUseCases } from '../../../../../Domain/use-case/inventarios/get-inventarioById-useCase';
import { detalleCarga } from '../../../../../Domain/models/cargaDatos/cargaDatos.model';
import { Subscription } from 'rxjs';
import { InventariosUseCases } from '../../../../../Domain/use-case/inventarios/get-inventarios-useCase';
import Swal from 'sweetalert2';
import { DescargarReportePdfComponent } from '@modules/reportes/components/descargar-reporte-pdf/descargar-reporte-pdf.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DescargarReporteExcelComponent } from '@modules/reportes/components/descargar-reporte-excel/descargar-reporte-excel.component';
import { HeaderPageReporteInventarioComponent } from '@modules/reportes/components/header-page-reporte-inventario/header-page-reporte-inventario.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { DesignReportInventarioComponent } from '@modules/reportes/components/design-reporte/design-report-inventario/design-report-inventario.component';
import { Logger } from 'html2canvas/dist/types/core/logger';

@Component({
  selector: 'reporte-inventario',
  standalone: true,
  imports: [
    DescargarReportePdfComponent,
    DescargarReporteExcelComponent,
    NgxPaginationModule,
    HeaderPageReporteInventarioComponent,
    FooterComponent,
    DescargarReportePdfComponent,
    DesignReportInventarioComponent
  ],
  templateUrl: './reporte-inventario.component.html',
  styleUrl: './reporte-inventario.component.css',
})
export class ReporteInventarioComponent {

  // ---------------------------------------------------------------------------------------
  // DECLARACIÓN VARIABLES
  // ---------------------------------------------------------------------------------------
  p: number = 1;
  cantidadListaProductos: number = 0;
  cantidadDatosInventarioLista: number = 0;
  mostrarRefrescoPagina: boolean = true;

  datosInventario: inventariosModel = {} as inventariosModel;
  InventarioSeleccionado: inventariosModel = {} as inventariosModel;
  selectedItem!: { rucempresa: string, idcarga: string };

  DetalleInventarioSeleccionado: Array<inventariosModel> = [];
  datosInventarioslista: Array<inventariosModel> = [];
  listaProductos: Array<detalleCarga> = [];

  // ---------------------------------------------------------------------------------------
  // INJECCIÓN SERVICIOS
  // ---------------------------------------------------------------------------------------
  private inventarioSubscription: Subscription | undefined;
  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly listaInventarios = inject(InventariosUseCases);

  // ---------------------------------------------------------------------------------------
  // FUNCIÓN PRINCIPAL
  // ---------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.listarInventarios();
  }

  // ---------------------------------------------------------------------------------------
  // INVENTARIO SELECCIONADO PARA SU EXPORTACIÓN
  // ---------------------------------------------------------------------------------------
  inventarioSeleccionado(rucEmpresa: string, idCarga: number) {
    this.ObjectInventario.getInventarioById(rucEmpresa, idCarga).subscribe(
      (response: inventariosModel) => {
        this.InventarioSeleccionado = response;
        console.log("LISTA DESDE REPORTE INVENTARIO: ",this.InventarioSeleccionado);

      }
    );
  }

  // ---------------------------------------------------------------------------------------
  // OBTENCIÓN DATOS DEL INVENTARIO SELECCIOADO PARA MOSTRAR SU DETALLE
  // ---------------------------------------------------------------------------------------
  ObtenerDetalleInventarios(rucempresa: string, idcarga: number) {
    this.ObjectInventario.getInventarioById(rucempresa, idcarga).subscribe(
      (response: inventariosModel) => {
        this.datosInventario = response;
        this.listaProductos = response.detalle;
        this.cantidadListaProductos = response.detalle.length;
      }
    );
  }

  // ---------------------------------------------------------------------------------------
  // RECARGAR LA PÁGINA
  // ---------------------------------------------------------------------------------------
  recargarPagina() {
    window.location.reload();
  }

  // ---------------------------------------------------------------------------------------
  // LISTA DE INVENTARIOS GENERALES
  // ---------------------------------------------------------------------------------------
  listarInventarios() {
    const now = Date.now();
    try {
      this.inventarioSubscription = this.listaInventarios
        .getInventarios()
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.datosInventarioslista = response;
              this.cantidadDatosInventarioLista = response.length;
              this.mostrarRefrescoPagina = false;
              localStorage.setItem('lastUpdated', now.toString());
            } else {
              this.respuestaInventariosNoValidos(response);
              this.datosInventarioslista = [];
              this.cantidadDatosInventarioLista = 0;
            }
          },
          error: (error) => {
            this.respuestaInventariosSinAcceso(error.name);
            this.datosInventarioslista = [];
            this.cantidadDatosInventarioLista = 0;
            this.mostrarRefrescoPagina = true;
          },
        });
    } catch (err) {
      this.respuestaInventariosErrorInesperado(err);
    }
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
    }).then((respuesta) => {});
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
