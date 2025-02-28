import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { RequestInventarioByFiltros } from 'src/app/Domain/models/inventarios/requestInventariosByFiltros.model';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
import { InventariosByFiltrosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventariosByFiltros-use-case';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { EmpresasService } from 'src/app/Infraestructure/driven-adapter/empresas/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'section-targets-datos',
  standalone: true,
  imports: [],
  templateUrl: './section-targets-datos.component.html',
  styleUrl: './section-targets-datos.component.css',
})
export class SectionTargetsDatosComponent {

  private inventarioSubscription: Subscription | undefined;
  private EmpresasSubscription: Subscription | undefined;
  private UsuariosSubscription: Subscription | undefined;

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================
  private readonly listaEmpresas = inject(EmpresasService);
  private readonly listaUsuarios = inject(GetUsuariosUseCases);
  private readonly listaInventariosbyfiltros = inject(InventariosByFiltrosUseCases);
  private readonly listaInventarios = inject(InventariosUseCases);


  datosInventarioslista: Array<inventariosModel> = [];
  datosFiltrados: inventariosModel[] = [];
  getEmpresas_All: Array<EmpresasModel> = [];
  getUsuarios_All: Array<SeguridadModel> = [];
  datosPaginated: Array<inventariosModel> = [];

  cantidadDatosInventarioLista: number = 0;
  p: number = 1; // Página actual
  itemsPerPage: number = 10;
  cantidadDatosFiltrados: number = 0;

  cantInvenariosTotales: number = 0;
  cantInvenariosTrabajados: number = 0;
  cantInvenariosAnulados: number = 0;
  cantInvenariosActivos: number = 0;

  // ================================================================================
  // FUNCIÓN PRINCIPAL
  // ================================================================================
  ngOnInit(): void {
    this.listarInventarios('', '');
    this.listarInventariosTrabajados('2', '')
    this.listarInventariosAnulados('0', '')
    this.listarInventariosActivos('1', '')
    this.listarEmpresas();
    this.listarUsuarios();
  }


  // ================================================================================
  // LISTA INVENTARIOS
  // ================================================================================


  listarInventarios(estado: string, rucempresa: string) {
    const reqDatos: RequestInventarioByFiltros = { rucempresa, estado };
    reqDatos.estado = estado;
    reqDatos.rucempresa = rucempresa;
    try {
      this.inventarioSubscription = this.listaInventariosbyfiltros
        .getInventariosByFiltros(reqDatos)
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.cantInvenariosTotales = response.length;

            } else {
              this.mostrarMensajeError('DATOS NO VÁLIDOS', `${response}`);
              this.cantidadDatosInventarioLista = 0;
            }
          },
          error: (error) => {
            this.mostrarMensajeError(
              error.name,
              'Verifique la conexión con el API y recargue el listado.'
            );
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

  listarInventariosActivos(estado: string, rucempresa: string) {
    const reqDatos: RequestInventarioByFiltros = { rucempresa, estado };
    reqDatos.estado = estado;
    reqDatos.rucempresa = rucempresa;
    try {
      this.inventarioSubscription = this.listaInventariosbyfiltros
        .getInventariosByFiltros(reqDatos)
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.cantInvenariosActivos = response.length;

            } else {
              this.mostrarMensajeError('DATOS NO VÁLIDOS', `${response}`);
              this.cantInvenariosActivos = 0;
            }
          },
          error: (error) => {
            this.mostrarMensajeError(
              error.name,
              'Verifique la conexión con el API y recargue el listado.'
            );
            this.cantInvenariosActivos = 0;
          },
        });
    } catch (err) {
      this.mostrarMensajeError(
        'Error inesperado',
        `Error en listarInventarios: ${err}`
      );
    }
  }


  listarInventariosTrabajados(estado: string, rucempresa: string) {
    const reqDatos: RequestInventarioByFiltros = { rucempresa, estado };
    reqDatos.estado = estado;
    reqDatos.rucempresa = rucempresa;
    try {
      this.inventarioSubscription = this.listaInventariosbyfiltros
        .getInventariosByFiltros(reqDatos)
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.cantInvenariosTrabajados = response.length;

            } else {
              this.mostrarMensajeError('DATOS NO VÁLIDOS', `${response}`);
              this.cantInvenariosTrabajados = 0;
            }
          },
          error: (error) => {
            this.mostrarMensajeError(
              error.name,
              'Verifique la conexión con el API y recargue el listado.'
            );
            this.cantInvenariosTrabajados = 0;
          },
        });
    } catch (err) {
      this.mostrarMensajeError(
        'Error inesperado',
        `Error en listarInventarios: ${err}`
      );
    }
  }

  listarInventariosAnulados(estado: string, rucempresa: string) {
    const reqDatos: RequestInventarioByFiltros = { rucempresa, estado };
    reqDatos.estado = estado;
    reqDatos.rucempresa = rucempresa;
    try {
      this.inventarioSubscription = this.listaInventariosbyfiltros
        .getInventariosByFiltros(reqDatos)
        .subscribe({
          next: (response: inventariosModel[]) => {
            if (Array.isArray(response)) {
              this.cantInvenariosAnulados = response.length;

            } else {
              this.mostrarMensajeError('DATOS NO VÁLIDOS', `${response}`);
              this.cantInvenariosAnulados = 0;
            }
          },
          error: (error) => {
            this.mostrarMensajeError(
              error.name,
              'Verifique la conexión con el API y recargue el listado.'
            );
            this.cantInvenariosAnulados = 0;
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
    } catch (err) {}
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
    this.inventarioSubscription?.unsubscribe();
    this.EmpresasSubscription?.unsubscribe();
    this.UsuariosSubscription?.unsubscribe();
    this.inventarioSubscription?.unsubscribe();
  }
}
