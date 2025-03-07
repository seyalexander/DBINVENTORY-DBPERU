import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleCargaInventariosComponent } from '@modules/Carga_Inventario/Page/detalle-carga-inventarios/detalle-carga-inventarios.component';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import Swal from 'sweetalert2';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { Subscription } from 'rxjs';
import { InventariosByIdUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioById-useCase';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { RegistroAsignarPageComponent } from '@modules/Asignaciones/page/registro-asignar-page/registro-asignar-page.component';
import { TdTableBtnDetalleComponent } from '@modules/Carga_Inventario/Components/buttons/td-table-btn-detalle/td-table-btn-detalle.component';
import { RegistroProductoNewInventarioComponent } from '@modules/Carga_Inventario/Page/registro-producto-new-inventario/registro-producto-new-inventario.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';
import { RequestObtenerDetalle } from 'src/app/Domain/models/inventarios/requestObtenerDetalle.model';
import { InventarioDetallesUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarioDetalle-usecase';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ButtonAsignarComponent } from '../buttons/button-asignar/button-asignar.component';
import { ButtonAnularInventarioComponent } from '../buttons/button-anular-inventario/button-anular-inventario.component';
import { AnularInventarioUseCase } from 'src/app/Domain/use-case/inventarios/anular-inventario-use-case';
import { RequestAnularInventario } from 'src/app/Domain/models/inventarios/requestAnularInventario.model';
import { ResponseAnularInventario } from 'src/app/Domain/models/inventarios/responseAnularInventario.model';
import { TdEstado1Component } from 'src/app/Ui/Shared/Components/tables/td-estado-1/td-estado-1.component';
import { TdEstado2Component } from 'src/app/Ui/Shared/Components/tables/td-estado-2/td-estado-2.component';
import { TdEstado3Component } from 'src/app/Ui/Shared/Components/tables/td-estado-3/td-estado-3.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { EmpresasService } from 'src/app/Infraestructure/driven-adapter/empresas/empresas.service';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { MatListModule } from '@angular/material/list';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'lista-inventarios-cargados',
  standalone: true,
  imports: [
    ButtonAsignarComponent,
    ButtonAnularInventarioComponent,
    NgxPaginationModule,
    RegistroAsignarPageComponent,
    DetalleCargaInventariosComponent,
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
    TdEstado1Component,
    TdEstado2Component,
    TdEstado3Component,
    MatSelectModule,
    FormsModule,
    MatListModule,
    CommonModule,
    MatSortModule
  ],
  templateUrl: './lista-inventarios-cargados.component.html',
  styleUrl: './lista-inventarios-cargados.component.css',
})
export class ListaInventariosCargadosComponent implements AfterViewInit {

  @Input() dataListaInventarios: inventariosModel[] = [];
  @Output() filtrosInventario = new EventEmitter<{ estado: string, rucempresa: string }>();

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
    'fechacreacion',
    'descripcion',
    'totalregistros',
    'UsuarioAsignado',
    'estado',
    'operaciones',
  ];

  dataSource = new MatTableDataSource<inventariosModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataListaInventarios']) {
      this.dataSource.data = this.dataListaInventarios || [];
    }
  }

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================
  private readonly listaEmpresas = inject(EmpresasService);
  private readonly ObjectInventario = inject(InventariosByIdUseCases);
  private readonly ListDetalleInventario = inject(InventarioDetallesUseCases);
  private readonly listaUsuarios = inject(GetUsuariosUseCases);
  private _liveAnnouncer = inject(LiveAnnouncer);

  private EmpresasSubscription: Subscription | undefined;
  private UsuariosSubscription: Subscription | undefined;

  descripcionButtonAnular: string = ''
  cantidadDatosInventarioLista: number = 0;
  cantidadListaProductos: number = 0;
  currentPage: number = 1;
  p: number = 1;

  datosInventario: inventariosModel = {} as inventariosModel;

  detalleInvenario: Array<detalleCarga> = [];
  listaProductos: Array<detalleCarga> = [];
  DatosEmpresas: Array<EmpresasModel> = [];
  datosInventarioslista: Array<inventariosModel> = [];
  getUsuarios_All: Array<SeguridadModel> = [];
  paginatedProductos: Array<detalleCarga> = [];

  showListOpciones: boolean = false;

  ngOnInit(): void {
    this.ObtenerEmpresas()
    this.listarUsuarios()
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  verListOpciones(): void {
    this.showListOpciones = !this.showListOpciones;
  }

  // ================================================================================
  // LISTA ESTADOS PARA FILTROS - ESTADOS
  // ================================================================================
  filtroEstados: Estados[] = [
    { value: '', viewValue: 'Todos' },
    { value: '1', viewValue: 'Activos' },
    { value: '0', viewValue: 'Inactivos' },
    { value: '2', viewValue: 'Inventariados' },
  ];
  selected = '1';

  // ================================================================================
  // LISTA ESTADOS PARA FILTROS - EMPRESAS
  // ================================================================================
  ObtenerEmpresas(): void {
    this.EmpresasSubscription = this.listaEmpresas.ListarEmpresas().subscribe(
      (response: MensajeResponseEmpresas) => {
        this.DatosEmpresas = response.empresas
      }
    )
  }

  selectedEmpresa = '';

  emitirFiltros() {
    this.filtrosInventario.emit({
      estado:  this.selected,
      rucempresa: this.selectedEmpresa
    });
  }

  // ================================================================================
  // RELOAD PAGINA
  // ================================================================================
  recargarPagina() {
    window.location.reload();
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
    } catch (err) { }
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
  ObtenerDetatosInventarios(rucempresa: string, idcarga: number) {
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
        response.estado == '1' ?  this.Alert_AnularInventario(response) : ''
      }
    );
  }

  Alert_AnularInventario(response: inventariosModel) {
    let countdown = 3; // Cuenta regresiva inicial

    Swal.fire({
      title: `<div class="text-red-600 text-2xl font-bold flex items-center justify-center">
                <span>Anular Inventario</span>
              </div>`,
      html: `
        <div class="border-b border-gray-300 pb-4">
          <p class="text-gray-700 text-lg text-center">
            ¿Seguro que deseas anular <span class="font-bold text-red-500">${response.descripcion}</span>?
          </p>
        </div>

        <div class="mt-4 text-left space-y-3">
          <p class="text-gray-600 text-sm text-center">Esta acción no se puede deshacer.</p>
          <p class="text-gray-600 text-sm text-center">Asegúrate de revisar antes de continuar.</p>
        </div>

        <!-- Contenedor de botones para asegurar su visibilidad -->
        <div id="swal-buttons" class="flex justify-center gap-4 mt-5">
          <button id="cancel-btn" class="bg-gray-500 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded w-36">
            Cancelar
          </button>
          <button id="confirm-btn" class="bg-red-600  text-white font-semibold px-4 py-2 rounded w-36" disabled>
            Sí, Anular (3)
          </button>
        </div>
      `,
      icon: "warning",
      showConfirmButton: false, // Ocultamos botones nativos de SweetAlert
      showCancelButton: false,
      didOpen: () => {
        const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;
        const confirmBtn = document.getElementById("confirm-btn") as HTMLButtonElement;

        if (cancelBtn) {
          cancelBtn.onclick = () => Swal.close(); // Cierra la alerta
        }

        // Iniciar cuenta regresiva
        const interval = setInterval(() => {
          countdown--;
          confirmBtn.textContent = `Sí, Anular (${countdown})`;

          if (countdown === 0) {
            clearInterval(interval);
            confirmBtn.textContent = "Sí, Anular";
            confirmBtn.disabled = false;
            confirmBtn.classList.add("hover:bg-red-700"); // Activa el hover
          }
        }, 1000);

        if (confirmBtn) {
          confirmBtn.onclick = () => {
            Swal.close();
            this.ResponseAnularInventarioInventarioSeleccionado();
          };
        }
      },
    });
  }








  ResponseAnularInventarioInventarioSeleccionado(): void {
    const rucempresa = this.datosInventario.rucempresa
    const usuarioAnulador: string = sessionStorage.getItem('user') ?? 'System'
    const idcarga: number = this.datosInventario.idcarga
    const estado: string = '0'
    const reqDatos: RequestAnularInventario = { rucempresa, idcarga, usuarioAnulador, estado };

    reqDatos.usuarioAnulador = usuarioAnulador
    reqDatos.rucempresa = rucempresa
    reqDatos.idcarga = idcarga

    this.ObjectInventarioAnular.anularInventario(reqDatos).subscribe(
      (response: ResponseAnularInventario) => {
        response.exito ? this.Alert_InventarioAnulado_Correctamente() : this.Alert_InventarioAnulado_Error()
      }
    );
  }

  Alert_InventarioAnulado_Correctamente() {
    Swal.fire({
      title: "Anulado!",
      text: "El inventario se anuló de manera correcta",
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  }

  Alert_InventarioAnulado_Error() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo anular el inventario, intente nuevamente",
    });
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
  // DESTRUCCION DE PETICIONES
  // ================================================================================
  ngOnDestroy(): void {
    if (this.EmpresasSubscription) {
      this.EmpresasSubscription.unsubscribe();
    }

    this.UsuariosSubscription?.unsubscribe()
  }
}

