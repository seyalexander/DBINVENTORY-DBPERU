import { Subscription } from 'rxjs';
import { HeaderCargaInventarioComponent } from '../../Components/header/header-carga-inventario/header-carga-inventario.component';
import { SidebarComponent } from '@modules/Carga_Inventario/Components/sidebar/sidebar/sidebar.component';
import { HeaderResponsiveComponent } from '@modules/Carga_Inventario/Components/sidebar/header-responsive/header-responsive.component';
import { getEmpresaUseCases } from 'src/app/Domain/use-case/empresas/get-empresas-useCase';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { BodyCargaInventarioComponent } from '@modules/Carga_Inventario/Components/body/body-carga-inventario/body-carga-inventario.component';
import { Component, inject } from '@angular/core';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';

@Component({
  selector: 'carga-inventario-page',
  standalone: true,
  imports: [
    HeaderCargaInventarioComponent,
    SidebarComponent,
    HeaderResponsiveComponent,
    BodyCargaInventarioComponent
  ],
  templateUrl: './carga-inventario-page.component.html',
  styleUrl: './carga-inventario-page.component.css',
})
export class CargaInventarioPageComponent {

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
