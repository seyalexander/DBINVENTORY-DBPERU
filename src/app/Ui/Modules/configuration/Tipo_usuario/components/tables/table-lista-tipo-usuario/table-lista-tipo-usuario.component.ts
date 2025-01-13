import { Component, Input } from '@angular/core';
import { HeaderTableComponent } from '../../header/header-table/header-table.component';
import { HeaderTableTitleComponent } from '../../header/header-table-title/header-table-title.component';
import { BodyTableButtonComponent } from '../../header/body-table/body-table-button/body-table-button.component';
import { RolesModel } from 'src/app/Domain/models/roles/roles.model';

@Component({
  selector: 'table-lista-tipo-usuario',
  standalone: true,
  imports: [
    HeaderTableComponent,
    HeaderTableTitleComponent,
    BodyTableButtonComponent
  ],
  templateUrl: './table-lista-tipo-usuario.component.html',
  styleUrl: './table-lista-tipo-usuario.component.css'
})
export class TableListaTipoUsuarioComponent {
  @Input() DatosTipoUsuario: Array<RolesModel> = []
}
