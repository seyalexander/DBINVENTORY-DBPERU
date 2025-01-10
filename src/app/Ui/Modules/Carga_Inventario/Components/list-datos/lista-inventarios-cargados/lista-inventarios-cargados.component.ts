import { Component, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { ModalAsignacionComponent } from '@modules/Asignaciones/inventarios/components/modal-asignacion/modal-asignacion.component';
import { DetalleCargaInventariosComponent } from '@modules/Carga_Inventario/Page/detalle-carga-inventarios/detalle-carga-inventarios.component';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import Swal from 'sweetalert2';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { Subscription } from 'rxjs';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { Router } from '@angular/router';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { HeaderTableCargaInventarioComponent } from '../../table-carga/header-table-carga-inventario/header-table-carga-inventario.component';
import { MensajeErrorListaComponent } from '../../table-carga/mensaje-error-lista/mensaje-error-lista.component';
import { TdEstadoCargaInventarioComponent } from '../../table-carga/td-estado-carga-inventario/td-estado-carga-inventario.component';
import { TdTableDescripcionComponent } from '../../table-carga/td-table-descripcion/td-table-descripcion.component';
import { TdTableUsuarioCreadorComponent } from '../../table-carga/td-table-usuario-creador/td-table-usuario-creador.component';
import { TdTableFechaComponent } from '../../table-carga/td-table-fecha/td-table-fecha.component';
import { TdTableBtnDetalleComponent } from '../../table-carga/td-table-btn-detalle/td-table-btn-detalle.component';
import { OpcionTableAsignarUsuarioComponent } from '../../table-carga/opcion-table-asignar-usuario/opcion-table-asignar-usuario.component';
import { ThTableCargaInventarioComponent } from '../../table-carga/th-table-carga-inventario/th-table-carga-inventario.component';

@Component({
  selector: 'lista-inventarios-cargados',
  standalone: true,
  imports: [
    HeaderTableCargaInventarioComponent,
    NgxPaginationModule,
    FooterComponent,
    ModalAsignacionComponent,
    DetalleCargaInventariosComponent,
    MensajeErrorListaComponent,
    TdEstadoCargaInventarioComponent,
    TdTableDescripcionComponent,
    TdTableUsuarioCreadorComponent,
    TdTableFechaComponent,
    TdTableBtnDetalleComponent,
    OpcionTableAsignarUsuarioComponent,
    ThTableCargaInventarioComponent
  ],
  templateUrl: './lista-inventarios-cargados.component.html',
  styleUrl: './lista-inventarios-cargados.component.css'
})
export class ListaInventariosCargadosComponent {

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

  ordenActual: { campo: keyof inventariosModel | null; direccion: 'asc' | 'desc' } = {
    campo: 'descripcion',
    direccion: 'asc',
  };

  ordenarPor(campo: keyof inventariosModel) {
    if (this.ordenActual.campo === campo) {
      this.ordenActual.direccion = this.ordenActual.direccion === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenActual.campo = campo;
      this.ordenActual.direccion = 'asc';
    }

    this.datosInventarioslista = [...this.datosInventarioslista].sort((a, b) => {
      const valorA = a[campo];
      const valorB = b[campo];

      if (valorA < valorB) return this.ordenActual.direccion === 'asc' ? -1 : 1;
      if (valorA > valorB) return this.ordenActual.direccion === 'asc' ? 1 : -1;
      return 0;
    });
  }

  restablecerOrden() {
    this.ordenActual = { campo: null, direccion: 'asc' };
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
