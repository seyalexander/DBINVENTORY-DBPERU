import { Component, inject } from '@angular/core';
import { GrupoButtonsHeaderCargaDatosComponent } from '../../Buttons/grupo-buttons-header-carga-datos/grupo-buttons-header-carga-datos.component';
import { DetalleInventarioComponent } from '../../detalle-inventario/detalle-inventario.component';
import { InventariosUseCases } from '../../../../../../Domain/use-case/inventarios/get-inventarios-useCase';
import { Subscription } from 'rxjs';
import { inventariosModel } from '../../../../../../Domain/models/inventarios/inventarios.models';
import { InventariosByIdUseCases } from '../../../../../../Domain/use-case/inventarios/get-inventarioById-useCase';
import { detalleCarga } from '../../../../../../Domain/models/cargaDatos/cargaDatos.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { ModalAsignacionComponent } from '@modules/Asignaciones/inventarios/components/modal-asignacion/modal-asignacion.component';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';

@Component({
  selector: 'table-design-one',
  standalone: true,
  imports: [
    GrupoButtonsHeaderCargaDatosComponent,
    DetalleInventarioComponent,
    NgxPaginationModule,
    FooterComponent,
    ModalAsignacionComponent,
  ],
  templateUrl: './table-design-one.component.html',
  styleUrl: './table-design-one.component.css',
})
export class TableDesignOneComponent {
  p: number = 1;

  private readonly listaUsuarios = inject(GetUsuariosUseCases);
  private readonly listaInventarios = inject(InventariosUseCases);
  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly router = inject(Router);

  private UsuariosSubscription: Subscription | undefined;
  private inventarioSubscription: Subscription | undefined;

  datosInventarioslista: Array<inventariosModel> = [];
  datosInventario: inventariosModel = {} as inventariosModel;
  cantidadDatosInventarioLista: number = 0;
  cantidadListaProductos: number = 0;
  listaProductos: Array<detalleCarga> = [];

  currentPage: number = 1;

  // Variables para paginación
  getUsuarios_All: Array<SeguridadModel> = [];
  paginatedProductos: Array<detalleCarga> = [];
  currentPageProductos: number = 1;
  itemsPerPageProductos: number = 5;
  totalPagesProductos: number = 0;
  cantidadLlamarSoporte: number = 0;

  mostrarRefrescoPagina: boolean = true;

  ngOnInit(): void {
    this.listarUsuarios();
    const token = localStorage.getItem('authToken');
    if (token) {
      this.listarInventarios();
    } else {
      this.ngOnDestroy();
      this.router.navigate(['/login']);
    }
  }

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

  respuestaInventariosLlamarSoporte(): void {
    Swal.fire({
      icon: 'error',
      title: `Contactarse con soporte técnico`,
      text: `Número de contacto`,
    });
  }

  recargarPagina() {
    window.location.reload();
  }

  ObtenerDetatosInventarios(rucempresa: string, idcarga: number) {
    this.ObjectInventario.getInventarioById(rucempresa, idcarga).subscribe(
      (response: inventariosModel) => {
        this.datosInventario = response;
      }
    );
  }

  ObtenerDetalleInventarios(rucempresa: string, idcarga: number) {
    this.ObjectInventario.getInventarioById(rucempresa, idcarga).subscribe(
      (response: inventariosModel) => {
        this.datosInventario = response;
        this.listaProductos = response.detalle;
        this.cantidadListaProductos = response.detalle.length;
        this.totalPagesProductos = Math.ceil(
          this.cantidadListaProductos / this.itemsPerPageProductos
        );
      }
    );
  }

  listarUsuarios(): void {
    try {
      this.UsuariosSubscription = this.listaUsuarios
        .ListarusUarios()
        .subscribe((Response: SeguridadModel[]) => {
          this.getUsuarios_All = Response;
        });
    } catch (err) {}
  }

  mostrarMensajeError(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    });
  }

  ngOnDestroy(): void {
    if (this.inventarioSubscription) {
      this.inventarioSubscription.unsubscribe();
    }

    if (this.UsuariosSubscription) {
      this.UsuariosSubscription.unsubscribe();
    }
  }
}
