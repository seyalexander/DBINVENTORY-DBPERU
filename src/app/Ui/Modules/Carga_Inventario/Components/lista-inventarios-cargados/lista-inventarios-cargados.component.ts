import { Component, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
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
import { RegistroAsignarPageComponent } from '@modules/Asignaciones/page/registro-asignar-page/registro-asignar-page.component';
import { TdEstadoCargaInventarioComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/td-estado-carga-inventario/td-estado-carga-inventario.component';
import { TdTableDescripcionComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/td-table-descripcion/td-table-descripcion.component';
import { TdTableUsuarioCreadorComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/td-table-usuario-creador/td-table-usuario-creador.component';
import { TdTableBtnDetalleComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/td-table-btn-detalle/td-table-btn-detalle.component';
import { OpcionTableAsignarUsuarioComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/opcion-table-asignar-usuario/opcion-table-asignar-usuario.component';
import { ThTableCargaInventarioComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/th-table-carga-inventario/th-table-carga-inventario.component';
import { AgregarProductoComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/Buttons/agregar-producto/agregar-producto.component';
import { RegistroProductoNewInventarioComponent } from '@modules/Carga_Inventario/Page/registro-producto-new-inventario/registro-producto-new-inventario.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';
import { RequestObtenerDetalle } from 'src/app/Domain/models/inventarios/requestObtenerDetalle.model';
import { InventarioDetallesUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioDetalle-usecase';

@Component({
  selector: 'lista-inventarios-cargados',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FooterComponent,
    RegistroAsignarPageComponent,
    DetalleCargaInventariosComponent,
    TdEstadoCargaInventarioComponent,
    TdTableDescripcionComponent,
    TdTableUsuarioCreadorComponent,
    TdTableBtnDetalleComponent,
    OpcionTableAsignarUsuarioComponent,
    ThTableCargaInventarioComponent,
    AgregarProductoComponent,
    RegistroProductoNewInventarioComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './lista-inventarios-cargados.component.html',
  styleUrl: './lista-inventarios-cargados.component.css'
})
export class ListaInventariosCargadosComponent {

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================
  private readonly listaUsuarios = inject(GetUsuariosUseCases);
  private readonly listaInventarios = inject(InventariosUseCases);
  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly ListDetalleInventario = inject(InventarioDetallesUseCases);
  private readonly router = inject(Router);

  private UsuariosSubscription: Subscription | undefined;
  private inventarioSubscription: Subscription | undefined;

  cantidadDatosInventarioLista: number = 0;
  cantidadListaProductos: number = 0;
  currentPage: number = 1;
  p: number = 1;

  datosInventario: inventariosModel = {} as inventariosModel;

  detalleInvenario: Array<detalleCarga> = [];
  listaProductos: Array<detalleCarga> = [];
  datosInventarioslista: Array<inventariosModel> = [];
  encabezadoTable: Array<EncabezadoTabla> = [];
  getUsuarios_All: Array<SeguridadModel> = [];
  paginatedProductos: Array<detalleCarga> = [];

  showListOpciones:boolean = false

  // ================================================================================
  // FUNCIÓN PRINCIPAL
  // ================================================================================
  ngOnInit(): void {
    this.encabezadoTablaDatos()
    this.listarUsuarios();
    const token = localStorage.getItem('authToken');
    if (token) {
      this.listarInventarios();
      this. verListOpciones()
    } else {
      this.ngOnDestroy();
      this.router.navigate(['/login']);
    }
  }

  verListOpciones():void {
    this.showListOpciones = !this.showListOpciones
  }

  // ================================================================================
  // LISTA INVENTARIOS
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

  // ================================================================================
  // uso pipe ordenamiento
  // ================================================================================
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

  // ================================================================================
  // RELOAD PAGINA
  // ================================================================================
  recargarPagina() {
    window.location.reload();
  }

  // ================================================================================
  // DATOS INVENTARIO PARA ASIGNAR USUARIO
  // ================================================================================
  ObtenerDetatosInventarios(rucempresa: string, idcarga: number): void {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
        this.datosInventario = response;
      }
    );
  }

  // ================================================================================
  // DATOS DETALLE INVENTARIO
  // ================================================================================
  ObtenerDetalleInventarios(rucempresa: string, idcarga: number) {
    const reqDatos: RequestObtenerDetalle = { rucempresa, idcarga };
    this.ListDetalleInventario.getDetalleInventario(reqDatos).subscribe(
      (response: detalleCarga[]) => {
        this.listaProductos = response;
        this.cantidadListaProductos = response.length;
      }
    );
    this.ObtenerDetatosInventarios(rucempresa, idcarga)
  }

  // ================================================================================
  // LISTA USUARIO
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
  // ENCABEZADO TABLA
  // ================================================================================
  encabezadoTablaDatos () {
    this.encabezadoTable = [
      {
        title: 'Descripción',
        ordenar: 'descripcion',
        icon: true,
        ordenarDatos: this.ordenarPor('descripcion')
      },
      {
        title: 'Usuario',
        ordenar: 'usuariocreacion',
        icon: true,
        ordenarDatos: this.ordenarPor('usuariocreacion')
      },
      {
        title: 'Estado',
        ordenar: 'estado',
        icon: true,
        ordenarDatos: this.ordenarPor('estado')
      },
      {
        title: 'Detalle',
        ordenar: '',
        icon: false
      },
    ]
  }

  // ================================================================================
  // SWEET ALERT
  // ================================================================================
  mostrarMensajeError(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    });
  }

  // ================================================================================
  // DESTRUCCION DE PETICIONES
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

interface EncabezadoTabla {
  title: string;
  ordenar: string;
  icon: boolean;
  ordenarDatos?: void;
}
