import { Component } from '@angular/core';
import { TableListaTipoUsuarioComponent } from '../../components/tables/table-lista-tipo-usuario/table-lista-tipo-usuario.component';

@Component({
  selector: 'app-tipo-usuario-page',
  standalone: true,
  imports: [TableListaTipoUsuarioComponent],
  templateUrl: './tipo-usuario-page.component.html',
  styleUrl: './tipo-usuario-page.component.css'
})
export class TipoUsuarioPageComponent {

}
