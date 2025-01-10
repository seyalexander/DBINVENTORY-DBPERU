import { DetalleInventarioComponent } from '@modules/Carga_Inventario/Components/detalle-inventario/detalle-inventario.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
import Swal from 'sweetalert2';
import { ModalAsignacionComponent } from '../modal-asignacion/modal-asignacion.component';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';

@Component({
  selector: 'app-asignacion-inventario',
  standalone: true,
  imports: [
    DetalleInventarioComponent,
    NgxPaginationModule,
    ModalAsignacionComponent
  ],
  templateUrl: './asignacion-inventario.component.html',
  styleUrl: './asignacion-inventario.component.css'
})
export class AsignacionInventarioComponent {

  private readonly listaUsuarios = inject(GetUsuariosUseCases);
  private UsuariosSubscription: Subscription | undefined;

  getUsuarios_All: Array<SeguridadModel> = [];


  p: number = 1;
  collection: Array<inventariosModel> = [];


  private readonly listaInventarios = inject(InventariosUseCases);
  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly router = inject(Router);

  private inventarioSubscription: Subscription | undefined;

  datosInventarioslista: Array<inventariosModel> = [];
  datosInventario: inventariosModel = {} as inventariosModel;
  cantidadDatosInventarioLista: number = 0;
  cantidadListaProductos: number = 0;
  listaProductos: Array<detalleCarga> = [];

  currentPage: number = 1

  // Variables para paginación
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

  listarUsuarios(): void {
    try {
      this.UsuariosSubscription = this.listaUsuarios
        .ListarusUarios()
        .subscribe((Response: SeguridadModel[]) => {
          this.getUsuarios_All = Response;
        });
    } catch (err) {}
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


  ObtenerDetatosInventarios(rucempresa: string, idcarga: number) {
    this.ObjectInventario.getInventarioById(rucempresa, idcarga).subscribe(
      (response: inventariosModel) => {
          this.datosInventario = response
      }
    );
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
