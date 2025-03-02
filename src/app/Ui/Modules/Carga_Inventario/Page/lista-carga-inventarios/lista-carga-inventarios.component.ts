import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { RegistroCargaInventariosComponent } from '../registro-carga-inventarios/registro-carga-inventarios.component';
import { ListaInventariosCargadosComponent } from '@modules/Carga_Inventario/Components/lista-inventarios-cargados/lista-inventarios-cargados.component';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { EmpresasService } from 'src/app/Infraestructure/driven-adapter/empresas/empresas.service';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { MatInputModule } from '@angular/material/input';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { InventariosByFiltrosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventariosByFiltros-use-case';
import { RequestInventarioByFiltros } from 'src/app/Domain/models/inventarios/requestInventariosByFiltros.model';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-lista-carga-inventarios',
  standalone: true,
  imports: [
    ListaInventariosCargadosComponent,
    RegistroCargaInventariosComponent,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatIcon
  ],
  templateUrl: './lista-carga-inventarios.component.html',
  styleUrl: './lista-carga-inventarios.component.css',
})
export class ListaCargaInventariosComponent {
  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================
  private readonly listaEmpresas = inject(EmpresasService);
  private readonly listaUsuarios = inject(GetUsuariosUseCases);
  private readonly listaInventariosbyfiltros = inject(InventariosByFiltrosUseCases);

  private EmpresasSubscription: Subscription | undefined;
  private UsuariosSubscription: Subscription | undefined;
  private inventarioSubscription: Subscription | undefined;

  datosInventarioslista: Array<inventariosModel> = [];
  datosFiltrados: inventariosModel[] = [];
  getEmpresas_All: Array<EmpresasModel> = [];
  getUsuarios_All: Array<SeguridadModel> = [];
  datosPaginated: Array<inventariosModel> = [];
  cantidadDatosInventarioLista: number = 0;
  p: number = 1; // Página actual
  itemsPerPage: number = 10;
  cantidadDatosFiltrados: number = 0;

  dataSource = new MatTableDataSource<inventariosModel>();
  paginator!: MatPaginator;

  // ================================================================================
  // FUNCIÓN PRINCIPAL
  // ================================================================================
  ngOnInit(): void {
    this.listarInventarios('', '')
    this.listarEmpresas();
    this.listarUsuarios();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toUpperCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }


  // ================================================================================
  // LISTA INVENTARIOS
  // ================================================================================
  selectedEmpresa: string = ''
  selected: string = ''

  aplicarFiltros(filtros: { estado: string, rucempresa: string }) {
    this.listarInventarios(filtros.estado, filtros.rucempresa);
  }

  listarInventarios(estado: string, rucempresa: string) {
    const reqDatos: RequestInventarioByFiltros = { rucempresa, estado };
    reqDatos.estado = estado
    reqDatos.rucempresa = rucempresa
    try {
      this.inventarioSubscription = this.listaInventariosbyfiltros
        .getInventariosByFiltros(reqDatos)
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.datosInventarioslista = response;
              this.datosFiltrados = response;
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
  // LISTA EMPRESAS
  // ================================================================================
  listarEmpresas(): void {
    try {
      this.EmpresasSubscription = this.listaEmpresas
        .ListarEmpresas()
        .subscribe((Response: MensajeResponseEmpresas) => {
          this.getEmpresas_All = Response.empresas;
        });
    } catch (err) { }
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

  mostrarMensajeError(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    });
  }

  // ================================================================================
  // DESTRUCCIÓN DE SUBSCRIPCIONES
  // ================================================================================
  ngOnDestroy(): void {
    this.EmpresasSubscription?.unsubscribe();
    this.UsuariosSubscription?.unsubscribe();
    this.inventarioSubscription?.unsubscribe();
  }
}
