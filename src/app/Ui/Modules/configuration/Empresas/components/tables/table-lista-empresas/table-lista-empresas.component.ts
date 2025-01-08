import { Component } from '@angular/core';
import { EmpresasService } from '../../../../../../../Infraestructure/driven-adapter/empresas/empresas.service';
import { EmpresasModel } from '../../../../../../../Domain/models/empresas/empresas.model';
import { Subscription } from 'rxjs';
import { RegistroEmpresaComponent } from '../../modals/registro-empresa/registro-empresa.component';
import { HeaderTableComponent } from '../../header/header-table/header-table.component';
import { HeaderTableTitleComponent } from '../../header/header-table-title/header-table-title.component';
import { BodyTableButtonComponent } from '../../header/body-table/body-table-button/body-table-button.component';
import { BodyTableButtonIconComponent } from '../../header/body-table/body-table-button-icon/body-table-button-icon.component';
import { BodyTableEstadoActivoComponent } from '../../header/body-table/body-table-estado-activo/body-table-estado-activo.component';
import { BodyTableEstadoInactivoComponent } from '../../header/body-table/body-table-estado-inactivo/body-table-estado-inactivo.component';
import { FooterTableComponent } from '../../header/footer-table/footer-table/footer-table.component';
import { DetalleEmpresaComponent } from '../../modals/detalle-empresa/detalle-empresa.component';
import { MessageEmptyListComponent } from '../../menssages/message-empty-list/message-empty-list.component';

@Component({
  selector: 'table-lista-empresas',
  standalone: true,
  imports: [
    RegistroEmpresaComponent,
    HeaderTableComponent,
    HeaderTableTitleComponent,
    BodyTableButtonComponent,
    BodyTableButtonIconComponent,
    BodyTableEstadoActivoComponent,
    BodyTableEstadoInactivoComponent,
    FooterTableComponent,
    DetalleEmpresaComponent,
    MessageEmptyListComponent
  ],
  templateUrl: './table-lista-empresas.component.html',
  styleUrl: './table-lista-empresas.component.css'
})
export class TableListaEmpresasComponent {

  private empresasSubscription: Subscription | undefined;
  DatosEmpresas: Array<EmpresasModel> = [];
  cantidadEmpresas: number = 0

  constructor(
    private _empresas: EmpresasService,
  ) {}

  ngOnInit(): void {
    this.listaEmpresas()
  }

  listaEmpresas() {
    this.empresasSubscription = this._empresas
    .ListarEmpresas()
    .subscribe((response: EmpresasModel[]) => {
      this.DatosEmpresas = response
      this.cantidadEmpresas = response.length
    });
  }

  ngOnDestroy(): void {
    if (this.empresasSubscription) {
      this.empresasSubscription.unsubscribe();
    }
  }

}
