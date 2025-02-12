import { Component, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderPageAsignarComponent } from '../header-page-asignar/header-page-asignar.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { Subscription } from 'rxjs';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import Swal from 'sweetalert2';
import { RegistroAsignarPageComponent } from '@modules/Asignaciones/page/registro-asignar-page/registro-asignar-page.component';
import { CommonModule } from '@angular/common';
import { ThTableAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/th-table-asignar/th-table-asignar.component';
import { MensajeErrorTablaDatosAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/mensaje-error-tabla-datos-asignar/mensaje-error-tabla-datos-asignar.component';
import { TdEstadoAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/td-estado-asignar/td-estado-asignar.component';
import { TdDescripcionAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/td-descripcion-asignar/td-descripcion-asignar.component';
import { TdUsuarioAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/td-usuario-asignar/td-usuario-asignar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';
import { TdTableBtnDetalleComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/td-table-btn-detalle/td-table-btn-detalle.component';
import { DetalleCargaInventariosComponent } from '@modules/Carga_Inventario/Page/detalle-carga-inventarios/detalle-carga-inventarios.component';
import { RequestObtenerDetalle } from 'src/app/Domain/models/inventarios/requestObtenerDetalle.model';
import { InventarioDetallesUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioDetalle-usecase';


type FiltroInventario = 'todos' | 'asignados' | 'noAsignados';

@Component({
  selector: 'tabla-inventarios-asignados',
  standalone: true,
  imports: [
    NgxPaginationModule,
    HeaderPageAsignarComponent,
    FooterComponent,
    RegistroAsignarPageComponent,
    CommonModule,
    ThTableAsignarComponent,
    MensajeErrorTablaDatosAsignarComponent,
    TdEstadoAsignarComponent,
    TdDescripcionAsignarComponent,
    TdUsuarioAsignarComponent,
    MatButtonModule,
    MatMenuModule,
    TdTableBtnDetalleComponent,
    DetalleCargaInventariosComponent,
  ],
  templateUrl: './tabla-inventarios-asignados.component.html',
  styleUrl: './tabla-inventarios-asignados.component.css'
})
export class TablaInventariosAsignadosComponent {

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================
  private readonly listaUsuarios = inject(GetUsuariosUseCases);
  private readonly listaInventarios = inject(InventariosUseCases);
  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly ListDetalleInventario = inject(InventarioDetallesUseCases);

  // ================================================================================
  // DECLARACION VARIABLES
  // ================================================================================
  collection: Array<inventariosModel> = [];
  getUsuarios_All: Array<SeguridadModel> = [];
  listaProductos: Array<detalleCarga> = [];
  paginatedProductos: Array<detalleCarga> = [];
  datosInventarioslista: Array<inventariosModel> = [];
  datosInventariosFiltradoslista: Array<inventariosModel> = [];

  datosInventario: inventariosModel = {} as inventariosModel;

  private inventarioSubscription: Subscription | undefined;
  private UsuariosSubscription: Subscription | undefined;

  currentPageProductos: number = 1;
  cantidadDatosInventarioLista: number = 0
  cantidadListaProductos: number = 0;
  mensajeCantidad: string = ''
  p: number = 1;

  mostrarRefrescoPagina: boolean = true;

  // ================================================================================
  // FUNCIÓN PRINCIPAL
  // ================================================================================
  ngOnInit(): void {
    this.listarUsuarios();
    this.listarInventarios();
    this.listarInventariosFiltro('asignados');
  }


  // ================================================================================
  // LISTA INVENTARIOS TODOS
  // ================================================================================
  listarInventarios() {
    try {
      this.inventarioSubscription = this.listaInventarios
        .getInventarios()
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.datosInventarioslista = response;
              this.cantidadDatosInventarioLista = response.length;
              this.mostrarRefrescoPagina = false;
            } else {
              this.mostrarMensajeError('DATOS NO VÁLIDOS',`${response}`)
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
            this.mostrarRefrescoPagina = true;
          },
        });
    } catch (err) {
      this.mostrarMensajeError(
        'Error inesperado',
        `Error en listarInventarios: ${err}`
      );
    }
  }

  onFiltroChange(filtro: string): void {
    if (filtro === 'todos' || filtro === 'asignados' || filtro === 'noAsignados') {
      this.listarInventariosFiltro(filtro);
    } else {
      this.mostrarFiltroErroneo('Filtro inválido')
    }
  }

  // ================================================================================
  // LISTA INVENTARIOS FILTRADOS
  // ================================================================================
  listarInventariosFiltro(filtro:FiltroInventario) {
    try {
      this.inventarioSubscription = this.listaInventarios
        .getInventarios()
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.datosInventariosFiltradoslista = response;
              this.mostrarRefrescoPagina = false;

              if(this.datosInventariosFiltradoslista.length == 0) {
                this.mensajeCantidad = 'Sin inventarios'
              }

              if(this.datosInventariosFiltradoslista.length == 1) {
                this.mensajeCantidad = `${this.datosInventariosFiltradoslista.length} Inventario`
              }

              if(this.datosInventariosFiltradoslista.length > 1) {
                this.mensajeCantidad = `${this.datosInventariosFiltradoslista.length} Inventarios`
              }

            } else {
              this.mostrarMensajeError('DATOS NO VÁLIDOS',`${response}`)
              this.datosInventariosFiltradoslista = [];
              this.cantidadDatosInventarioLista = 0;
            }
          },
          error: (error) => {
            this.mostrarMensajeError(
              error.name,
              'Verifique la conexión con el API y recargue el listado.'
            );
            this.datosInventariosFiltradoslista = [];
            this.cantidadDatosInventarioLista = 0;
            this.mostrarRefrescoPagina = true;
          },
        });
    } catch (err) {
      this.mostrarMensajeError(
        'Error inesperado',
        `Error en listarInventarios: ${err}`
      );
    }
  }

  // ================================================================================
  // LISTA USUARIOS
  // ================================================================================
  listarUsuarios(): void {
    try {
      this.UsuariosSubscription = this.listaUsuarios
        .ListarusUarios()
        .subscribe((Response: MensajeSeguridadModel) => {
          this.getUsuarios_All = Response.usuarios;
        });
    } catch (err) {}
  }

  // ================================================================================
  // RECARGA DE PÁGINA
  // ================================================================================
  recargarPagina() {
    window.location.reload();
  }

  // ================================================================================
  // DETALLE INVENTARIO
  // ================================================================================
    ObtenerDetalleInventarios(rucempresa: string, idcarga: number) {
      const reqDatos: RequestObtenerDetalle = { rucempresa, idcarga };
      this.ListDetalleInventario.getDetalleInventario(reqDatos).subscribe(
        (response: detalleCarga[]) => {
          this.listaProductos = response;


        }
      );
      this.ObtenerDetatosInventarios(rucempresa, idcarga)
    }

  // ================================================================================
  // DATOS INVENTARIO
  // ================================================================================
  ObtenerDetatosInventarios(rucempresa: string, idcarga: number) {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
          this.datosInventario = response
      }
    );
  }
  // ================================================================================
  // PAGINADO
  // ================================================================================

  itemsPerPage: number = 10;

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
  }

  // ================================================================================
  // SWEET ALERT
  // ================================================================================
  respuestaInventariosLlamarSoporte(): void {
    Swal.fire({
      icon: 'error',
      title: `Contactarse con soporte técnico`,
      text: `Número de contacto`,
    });
  }

  mostrarMensajeError(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    });
  }

  mostrarFiltroErroneo(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: "ERROR",
      text: mensaje,
    });
  }

  // ================================================================================
  // DESTRUCCIÓN SUBSCRIPCIONES
  // ================================================================================
  ngOnDestroy(): void {
    if (this.inventarioSubscription) {
      this.inventarioSubscription.unsubscribe();
    }

    if (this.UsuariosSubscription) {
      this.UsuariosSubscription.unsubscribe();
    }
  }
}
