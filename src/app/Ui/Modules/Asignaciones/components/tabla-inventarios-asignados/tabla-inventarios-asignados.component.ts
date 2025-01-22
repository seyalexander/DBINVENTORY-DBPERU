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
import { Router } from '@angular/router';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import Swal from 'sweetalert2';
import { InventariosFiltroUseCases } from 'src/app/Domain/use-case/inventarios/get-inventariosFiltrado-useCase';
import { RegistroAsignarPageComponent } from '@modules/Asignaciones/page/registro-asignar-page/registro-asignar-page.component';
import { DetalleCargaInventariosComponent } from '@modules/Carga_Inventario/Page/detalle-carga-inventarios/detalle-carga-inventarios.component';
import { CommonModule } from '@angular/common';
import { ThTableAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/th-table-asignar/th-table-asignar.component';
import { MensajeErrorTablaDatosAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/mensaje-error-tabla-datos-asignar/mensaje-error-tabla-datos-asignar.component';
import { TdEstadoAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/td-estado-asignar/td-estado-asignar.component';
import { ButtonVerDetalleAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/buttons/button-ver-detalle-asignar/button-ver-detalle-asignar.component';
import { TdDescripcionAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/td-descripcion-asignar/td-descripcion-asignar.component';
import { TdUsuarioAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/td-usuario-asignar/td-usuario-asignar.component';
import { TdFechaAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/table-asignar/td-fecha-asignar/td-fecha-asignar.component';
import { ButtonIconAsignarComponent } from 'src/app/Ui/Shared/feactures/asignarUsuario/buttons/button-icon-asignar/button-icon-asignar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


type FiltroInventario = 'todos' | 'asignados' | 'noAsignados';

@Component({
  selector: 'tabla-inventarios-asignados',
  standalone: true,
  imports: [
    NgxPaginationModule,
    HeaderPageAsignarComponent,
    FooterComponent,
    RegistroAsignarPageComponent,
    DetalleCargaInventariosComponent,
    CommonModule,
    ThTableAsignarComponent,
    MensajeErrorTablaDatosAsignarComponent,
    TdEstadoAsignarComponent,
    ButtonVerDetalleAsignarComponent,
    TdDescripcionAsignarComponent,
    TdUsuarioAsignarComponent,
    TdFechaAsignarComponent,
    ButtonIconAsignarComponent,
    MatButtonModule,
    MatMenuModule
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
  private readonly listaInventariosFiltro = inject(InventariosFiltroUseCases);
  private readonly router = inject(Router);

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
  itemsPerPageProductos: number = 5;
  totalPagesProductos: number = 0;
  cantidadDatosInventarioLista: number = 0;
  cantidadListaProductos: number = 0;
  p: number = 1;

  mostrarRefrescoPagina: boolean = true;

  // ================================================================================
  // FUNCIÓN PRINCIPAL
  // ================================================================================
  ngOnInit(): void {
    this.listarUsuarios();
    this.listarInventariosFiltro('asignados');
    const token = localStorage.getItem('authToken');
    if (token) {
      this.listarInventarios();
    } else {
      this.ngOnDestroy();
      this.router.navigate(['/login']);
    }
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
      console.error('Filtro inválido:', filtro);
    }
  }

  // ================================================================================
  // LISTA INVENTARIOS FILTRADOS
  // ================================================================================
  listarInventariosFiltro(filtro:FiltroInventario) {
    try {
      this.inventarioSubscription = this.listaInventariosFiltro
        .getInventarios(filtro)
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.datosInventariosFiltradoslista = response;
              this.mostrarRefrescoPagina = false;
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
        .subscribe((Response: SeguridadModel[]) => {
          this.getUsuarios_All = Response;
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
    this.ObjectInventario.getInventarioById(rucempresa, idcarga).subscribe(
      (response: inventariosModel) => {
          this.datosInventario = response
          this.listaProductos = response.detalle
          this.cantidadListaProductos = response.detalle.length
          this.totalPagesProductos = Math.ceil(
          this.cantidadListaProductos / this.itemsPerPageProductos
        );
      }
    );
  }

  // ================================================================================
  // DATOS INVENTARIO
  // ================================================================================
  ObtenerDetatosInventarios(rucempresa: string, idcarga: number) {
    this.ObjectInventario.getInventarioById(rucempresa, idcarga).subscribe(
      (response: inventariosModel) => {
          this.datosInventario = response
      }
    );
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
