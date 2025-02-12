import { Component } from '@angular/core';
import { TableUsuariosComponent } from '../../components/tables/table-usuarios/table-usuarios.component';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [
    TableUsuariosComponent,
    RegistroUsuarioComponent
  ],
  templateUrl: './usuario-page.component.html',
  styleUrl: './usuario-page.component.css'
})
export class UsuarioPageComponent {

}
