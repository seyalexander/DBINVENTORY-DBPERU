import { Component } from '@angular/core';
import { EmpresasService } from '../../../../../../../Infraestructure/driven-adapter/empresas/empresas.service';
import { EmpresasModel } from '../../../../../../../Domain/models/empresas/empresas.model';
import { Subscription } from 'rxjs';
import { HeaderTableComponent } from '../../header/header-table/header-table.component';
import { HeaderTableTitleComponent } from '../../header/header-table-title/header-table-title.component';
import { BodyTableButtonComponent } from '../../header/body-table/body-table-button/body-table-button.component';
import { BodyTableButtonIconComponent } from '../../header/body-table/body-table-button-icon/body-table-button-icon.component';
import { BodyTableEstadoActivoComponent } from '../../header/body-table/body-table-estado-activo/body-table-estado-activo.component';
import { BodyTableEstadoInactivoComponent } from '../../header/body-table/body-table-estado-inactivo/body-table-estado-inactivo.component';
import { FooterTableComponent } from '../../header/footer-table/footer-table/footer-table.component';
import { DetalleEmpresaComponent } from '../../modals/detalle-empresa/detalle-empresa.component';
import { MessageEmptyListComponent } from '../../menssages/message-empty-list/message-empty-list.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';
import { RegistroEmpresaComponent } from '@modules/configuration/Empresas/page/registro-empresa/registro-empresa.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'table-lista-empresas',
  standalone: true,
  imports: [
    RegistroEmpresaComponent,
    HeaderTableComponent,
    HeaderTableTitleComponent,
    BodyTableButtonComponent,
    BodyTableEstadoActivoComponent,
    BodyTableEstadoInactivoComponent,
    DetalleEmpresaComponent,
    MessageEmptyListComponent,
    FooterComponent,
    NgxPaginationModule
  ],
  templateUrl: './table-lista-empresas.component.html',
  styleUrl: './table-lista-empresas.component.css'
})
export class TableListaEmpresasComponent {

  private  empresasSubscription: Subscription | undefined;
  DatosEmpresas: Array<EmpresasModel> = [];
  cantidadEmpresas: number = 0
  p: number = 1;

  constructor(
    private readonly _empresas: EmpresasService,
  ) {}

  ngOnInit(): void {
    this.listaEmpresas()
  }

  listaEmpresas() {
    this.empresasSubscription = this._empresas
    .ListarEmpresas()
    .subscribe((response: MensajeResponseEmpresas) => {
      this.DatosEmpresas = response.empresas
      this.cantidadEmpresas = response.empresas.length
    });
  }

  itemsPerPage: number = 10;

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
  }

  ngOnDestroy(): void {
    if (this.empresasSubscription) {
      this.empresasSubscription.unsubscribe();
    }
  }

}
