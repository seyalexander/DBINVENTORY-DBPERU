import { Component, Input } from '@angular/core';
import { HeaderTableComponent } from '../../header/header-table/header-table.component';
import { HeaderTableTitleComponent } from '../../header/header-table-title/header-table-title.component';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { BodyTableButtonComponent } from '../../header/body-table/body-table-button/body-table-button.component';

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
  @Input() DatosTipoUsuario: Array<SeguridadModel> = []
}
