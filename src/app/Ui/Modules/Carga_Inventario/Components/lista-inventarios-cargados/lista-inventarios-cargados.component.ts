import {
  AfterViewInit,
  Component,
  inject,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { DetalleCargaInventariosComponent } from '@modules/Carga_Inventario/Page/detalle-carga-inventarios/detalle-carga-inventarios.component';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import Swal from 'sweetalert2';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { Subscription } from 'rxjs';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { RegistroAsignarPageComponent } from '@modules/Asignaciones/page/registro-asignar-page/registro-asignar-page.component';
import { TdEstadoCargaInventarioComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/td-estado-carga-inventario/td-estado-carga-inventario.component';
import { TdTableBtnDetalleComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/table-carga/td-table-btn-detalle/td-table-btn-detalle.component';
import { RegistroProductoNewInventarioComponent } from '@modules/Carga_Inventario/Page/registro-producto-new-inventario/registro-producto-new-inventario.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';
import { RequestObtenerDetalle } from 'src/app/Domain/models/inventarios/requestObtenerDetalle.model';
import { InventarioDetallesUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioDetalle-usecase';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ButtonProductoComponent } from '../buttons/button-producto/button-producto.component';
import { ButtonAsignarComponent } from '../buttons/button-asignar/button-asignar.component';
import { ButtonAnularInventarioComponent } from '../buttons/button-anular-inventario/button-anular-inventario.component';
import { AnularInventarioUseCase } from 'src/app/Domain/use-case/inventarios/anular-inventario-use-case';
import { RequestAnularInventario } from 'src/app/Domain/models/inventarios/requestAnularInventario.model';
import { ResponseAnularInventario } from 'src/app/Domain/models/inventarios/responseAnularInventario.model';

@Component({
  selector: 'lista-inventarios-cargados',
  standalone: true,
  imports: [
    ButtonProductoComponent,
    ButtonAsignarComponent,
    ButtonAnularInventarioComponent,
    NgxPaginationModule,
    FooterComponent,
    RegistroAsignarPageComponent,
    DetalleCargaInventariosComponent,
    TdEstadoCargaInventarioComponent,
    TdTableBtnDetalleComponent,
    RegistroProductoNewInventarioComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatMenu,
  ],
  templateUrl: './lista-inventarios-cargados.component.html',
  styleUrl: './lista-inventarios-cargados.component.css',
})
export class ListaInventariosCargadosComponent implements AfterViewInit {
  @Input() dataListaInventarios: inventariosModel[] = [];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ================================================================================
  // DATOS PARA TABLA DE ANGULAR MATERIAL
  // ================================================================================
  displayedColumns: string[] = [
    'descripcion',
    'usuariocreacion',
    'estado',
    'detalle',
    'asignacion',
  ];

  dataSource = new MatTableDataSource<inventariosModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataListaInventarios']) {
      this.dataSource.data = this.dataListaInventarios || [];
    }
  }

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================
  private readonly listaUsuarios = inject(GetUsuariosUseCases);
  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly ListDetalleInventario = inject(InventarioDetallesUseCases);

  private UsuariosSubscription: Subscription | undefined;

  descripcionButtonAnular: string = ''
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

  showListOpciones: boolean = false;

  // ================================================================================
  // FUNCIÓN PRINCIPAL
  // ================================================================================
  ngOnInit(): void {
    this.listarUsuarios();
  }

  verListOpciones(): void {
    this.showListOpciones = !this.showListOpciones;
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
  // DATOS INVENTARIO PARA AGREGAR PRODUCTOS
  // ================================================================================
  ObtenerDatosAddProductos(rucempresa: string, idcarga: number): void {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
        this.datosInventario = response;
      }
    );
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
  // ANULAR INVENTARIO
  // ================================================================================

  private readonly ObjectInventarioAnular = inject(AnularInventarioUseCase);

  ObtenerDatosAnularInventario(rucempresa: string, idcarga: number): void {
    const reqDatos: requestDatosasignar = { rucempresa, idcarga };
    this.ObjectInventario.getInventarioById(reqDatos).subscribe(
      (response: inventariosModel) => {
        this.datosInventario = response;
        if (response.estado == '0') {
          Swal.fire({
            title: "Error",
            text: `El inventario ${response.descripcion} ya se encuentra anulado `,
            icon: "error",
          })
        }

        if (response.estado == '1') {
          Swal.fire({
            title: `Se anulará el inventario ${response.descripcion}`,
            text: "¿Estás seguro de anular este inventario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Anular"
          }).then((result) => {
            if (result.isConfirmed) {
              this.ResponseAnularInventarioInventarioSeleccionado()
            }
          });
        }

        if (response.estado == '2') {
          Swal.fire({
            title: "Error",
            text: `El inventario ${response.descripcion} ya se encuentra trabajado `,
            icon: "error",
          })
        }

      }
    );
  }

  ResponseAnularInventarioInventarioSeleccionado(): void {
    const rucempresa = this.datosInventario.rucempresa
    const usuarioAnulador: string = sessionStorage.getItem('user') || 'System'
    const idcarga: number = this.datosInventario.idcarga
    const estado: string = '0'
    const reqDatos: RequestAnularInventario = { rucempresa, idcarga, usuarioAnulador, estado };

    reqDatos.usuarioAnulador = usuarioAnulador
    reqDatos.rucempresa = rucempresa
    reqDatos.idcarga = idcarga

    this.ObjectInventarioAnular.anularInventario(reqDatos).subscribe(
      (response: ResponseAnularInventario) => {
        if (response.exito = true) {
          Swal.fire({
            title: "Anulado!",
            text: "El inventario se anuló de manera correcta",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });

        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo anular el inventario, intente nuevamente",
          });
        }
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
    this.ObtenerDetatosInventarios(rucempresa, idcarga);
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
    } catch (err) { }
  }

  itemsPerPage: number = 10;

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
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
