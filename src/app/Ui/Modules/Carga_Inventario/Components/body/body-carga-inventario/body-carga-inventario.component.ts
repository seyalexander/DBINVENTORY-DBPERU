import { Component, inject } from '@angular/core';
import { HeaderBreadcrumbComponent } from '../../header/header-breadcrumb/header-breadcrumb.component';
import { GrupoStatsCargaDatosComponent } from '../../Stats/grupo-stats-carga-datos/grupo-stats-carga-datos.component';
import { TableDesignOneComponent } from '../../Tables/table-design-one/table-design-one.component';
import { ModalCargaDatosComponent } from '../../Modals/modal-carga-datos/modal-carga-datos.component';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
import { getEmpresaUseCases } from 'src/app/Domain/use-case/empresas/get-empresas-useCase';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { Subscription } from 'rxjs';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';

@Component({
  selector: 'body-carga-inventario',
  standalone: true,
  imports: [
    HeaderBreadcrumbComponent,
    GrupoStatsCargaDatosComponent,
    TableDesignOneComponent,
    ModalCargaDatosComponent
  ],
  templateUrl: './body-carga-inventario.component.html',
  styleUrl: './body-carga-inventario.component.css'
})
export class BodyCargaInventarioComponent {
private listaInventarios = inject(InventariosUseCases)
  private listaEmpresas = inject(getEmpresaUseCases)
  private listaUsuarios = inject(GetUsuariosUseCases)

  private inventarioSubscription: Subscription | undefined;
  private EmpresasSubscription: Subscription | undefined;
  private UsuariosSubscription: Subscription | undefined;

  cantidadDatosInventarioLista: number = 0


 getEmpresas_All: Array<EmpresasModel> = []
 getUsuarios_All: Array<SeguridadModel> = []

  ngOnInit(): void {
    this.listarInventarios()
    this.listarEmpresas()
    this.listarUsuarios()
  }


  // LISTA DE TODOS LOS INVENTARIOS
  listarInventarios() {
    try {
      this.inventarioSubscription = this.listaInventarios
      .getInventarios()
      .subscribe((Response: inventariosModel[]) => {
        this.cantidadDatosInventarioLista = Response.length
      });
    }catch(err){

    }
  }

  // LISTA DE TODAS LAS EMPRESAS
  listarEmpresas() {
    try {
      this.EmpresasSubscription = this.listaEmpresas
      .ListarEmpresas()
      .subscribe((Response: EmpresasModel[]) => {
        this.getEmpresas_All = Response
      });
    }catch(err){

    }
  }

  // LISTA DE TODAS LAS EMPRESAS
  listarUsuarios() {
    try {
      this.UsuariosSubscription = this.listaUsuarios
      .ListarusUarios()
      .subscribe((Response: SeguridadModel[]) => {
        this.getUsuarios_All = Response
      });
    }catch(err){

    }
  }

  ngOnDestroy(): void {
    if (this.inventarioSubscription) {
      this.inventarioSubscription.unsubscribe();
    }

    if (this.EmpresasSubscription) {
      this.EmpresasSubscription.unsubscribe();
    }

    if (this.UsuariosSubscription) {
      this.UsuariosSubscription.unsubscribe();
    }
  }
}
