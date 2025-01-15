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

@Component({
  selector: 'tabla-inventarios-asignados',
  standalone: true,
  imports: [
    NgxPaginationModule,
    HeaderPageAsignarComponent,
    FooterComponent,
    RegistroAsignarPageComponent,
    DetalleCargaInventariosComponent
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

  // ================================================================================
  // LISTA INVENTARIOS FILTRADOS
  // ================================================================================
  listarInventariosFiltro(filtro: 'todos' | 'asignados' | 'noAsignados') {
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
