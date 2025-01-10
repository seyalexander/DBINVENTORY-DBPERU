import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListasEmpresasComponent } from '@modules/Carga_Inventario/Components/list-datos/listas-empresas/listas-empresas.component';
import { ListasUsuariosComponent } from '@modules/Carga_Inventario/Components/list-datos/listas-usuarios/listas-usuarios.component';
import { MenuOpcionesComponent } from '@modules/Carga_Inventario/Components/list-datos/menu-opciones/menu-opciones.component';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';

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
