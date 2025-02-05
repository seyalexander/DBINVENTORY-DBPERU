import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { RegistroCargaInventariosComponent } from '../registro-carga-inventarios/registro-carga-inventarios.component';
import { HeaderPageComponent } from '@modules/Carga_Inventario/Components/header-page/header-page.component';
import { ListaInventariosCargadosComponent } from '@modules/Carga_Inventario/Components/lista-inventarios-cargados/lista-inventarios-cargados.component';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { EmpresasService } from 'src/app/Infraestructure/driven-adapter/empresas/empresas.service';

@Component({
  selector: 'app-lista-carga-inventarios',
  standalone: true,
  imports: [
    HeaderPageComponent,
    ListaInventariosCargadosComponent,
    RegistroCargaInventariosComponent,
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

  private EmpresasSubscription: Subscription | undefined;
  private UsuariosSubscription: Subscription | undefined;

  getEmpresas_All: Array<EmpresasModel> = [];
  getUsuarios_All: Array<SeguridadModel> = [];

  // ================================================================================
  // FUNCIÓN PRINCIPAL
  // ================================================================================
  ngOnInit(): void {
    this.listarEmpresas();
    this.listarUsuarios();
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
        .subscribe((Response: SeguridadModel[]) => {
          this.getUsuarios_All = Response;
        });
    } catch (err) {}
  }

  // ================================================================================
  // DESTRUCCIÓN DE SUBSCRIPCIONES
  // ================================================================================
  ngOnDestroy(): void {
    if (this.EmpresasSubscription) {
      this.EmpresasSubscription.unsubscribe();
    }
    if (this.UsuariosSubscription) {
      this.UsuariosSubscription.unsubscribe();
    }
  }
}
