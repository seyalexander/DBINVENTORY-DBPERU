import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuOpcionesGeneralComponent } from 'src/app/Ui/Shared/Components/organisms/menu-opciones/menu-opciones.component';
import { ListaAsignarPageComponent } from '../lista-asignar-page/lista-asignar-page.component';

@Component({
  selector: 'asignaciones',
  standalone: true,
  imports: [
    RouterOutlet,
    ListaAsignarPageComponent
  ],
  templateUrl: './asignaciones.component.html',
  styleUrl: './asignaciones.component.css',
})
export class AsignacionesComponent {

}
