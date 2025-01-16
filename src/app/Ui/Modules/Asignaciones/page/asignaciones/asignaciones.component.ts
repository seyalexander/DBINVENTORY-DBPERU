import { Component } from '@angular/core';
import { ListaAsignarPageComponent } from '../lista-asignar-page/lista-asignar-page.component';
import { HeaderFiltroAsignacionComponent } from '@modules/Asignaciones/components/header-filtro-asignacion/header-filtro-asignacion.component';

@Component({
  selector: 'asignaciones',
  standalone: true,
  imports: [
    ListaAsignarPageComponent,
    HeaderFiltroAsignacionComponent
  ],
  templateUrl: './asignaciones.component.html',
  styleUrl: './asignaciones.component.css',
})
export class AsignacionesComponent {

}
