import { Component, Input } from '@angular/core';
import { HeaderTableTitleComponent } from '../../header/header-table-title/header-table-title.component';
import { BodyTableButtonComponent } from '../../header/body-table/body-table-button/body-table-button.component';
import { RolesModel } from 'src/app/Domain/models/roles/roles.model';
import { HeaderPageTableTipoUsuarioComponent } from '../../header/header-page-table-tipo-usuario/header-page-table-tipo-usuario.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';

@Component({
  selector: 'table-lista-tipo-usuario',
  standalone: true,
  imports: [
    HeaderTableTitleComponent,
    BodyTableButtonComponent,
    HeaderPageTableTipoUsuarioComponent,
    FooterComponent,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './table-lista-tipo-usuario.component.html',
  styleUrl: './table-lista-tipo-usuario.component.css'
})
export class TableListaTipoUsuarioComponent {
  @Input() DatosTipoUsuario: Array<RolesModel> = []
}
