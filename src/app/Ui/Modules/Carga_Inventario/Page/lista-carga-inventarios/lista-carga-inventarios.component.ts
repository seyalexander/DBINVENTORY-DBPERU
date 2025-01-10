import { Component, inject } from '@angular/core';
import { BodyCargaInventarioComponent } from '@modules/Carga_Inventario/Components/body-carga-inventario/body-carga-inventario.component';
import { Subscription } from 'rxjs';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { getEmpresaUseCases } from 'src/app/Domain/use-case/empresas/get-empresas-useCase';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { RegistroCargaInventariosComponent } from '../registro-carga-inventarios/registro-carga-inventarios.component';
import { SidebarComponent } from 'src/app/Ui/Shared/Components/organisms/sidebar/sidebar.component';
import { HeaderResponsiveComponent } from 'src/app/Ui/Shared/Components/organisms/header-responsive/header-responsive.component';
import { HeaderBuscadorUsuarioMovilComponent } from 'src/app/Ui/Shared/Components/organisms/header-buscador-usuario-movil/header-buscador-usuario-movil.component';

@Component({
  selector: 'app-lista-carga-inventarios',
  standalone: true,
  imports: [
    HeaderBuscadorUsuarioMovilComponent,
    SidebarComponent,
    HeaderResponsiveComponent,
    BodyCargaInventarioComponent,
    RegistroCargaInventariosComponent,
  ],
  templateUrl: './lista-carga-inventarios.component.html',
  styleUrl: './lista-carga-inventarios.component.css'
})
export class ListaCargaInventariosComponent {
// ============================================================ INYECCIÓN DE SERVICIOS
  private readonly listaEmpresas = inject(getEmpresaUseCases);
  private readonly listaUsuarios = inject(GetUsuariosUseCases);

  private EmpresasSubscription: Subscription | undefined;
  private UsuariosSubscription: Subscription | undefined;

  getEmpresas_All: Array<EmpresasModel> = [];
  getUsuarios_All: Array<SeguridadModel> = [];

  // ============================================================ FUNCIÓN PRINCIPAL
  ngOnInit(): void {
    this.listarEmpresas();
    this.listarUsuarios();
  }

  // ============================================================ LISTA EMPRESAS
  listarEmpresas(): void {
    try {
      this.EmpresasSubscription = this.listaEmpresas
        .ListarEmpresas()
        .subscribe((Response: EmpresasModel[]) => {
          this.getEmpresas_All = Response;
        });
    } catch (err) {}
  }

  // ============================================================ LISTA USUARIOS
  listarUsuarios(): void {
    try {
      this.UsuariosSubscription = this.listaUsuarios
        .ListarusUarios()
        .subscribe((Response: SeguridadModel[]) => {
          this.getUsuarios_All = Response;
        });
    } catch (err) {}
  }

  // ============================================================ DESTRUCCIÓN DE SUBSCRIPCIONES
  ngOnDestroy(): void {
    if (this.EmpresasSubscription) {
      this.EmpresasSubscription.unsubscribe();
    }

    if (this.UsuariosSubscription) {
      this.UsuariosSubscription.unsubscribe();
    }
  }
}
