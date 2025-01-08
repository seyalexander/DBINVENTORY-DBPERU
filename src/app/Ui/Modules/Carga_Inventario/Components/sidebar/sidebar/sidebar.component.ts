import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { ListasUsuariosComponent } from '../../list-datos/listas-usuarios/listas-usuarios.component';
import { ListasEmpresasComponent } from '../../list-datos/listas-empresas/listas-empresas.component';
import { MenuOpcionesComponent } from '../../list-datos/menu-opciones/menu-opciones.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    ListasUsuariosComponent,
    ListasEmpresasComponent,
    MenuOpcionesComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() getEmpresas_all: Array<EmpresasModel> = []
  @Input() getUsuarios_all: Array<SeguridadModel> = []
}
