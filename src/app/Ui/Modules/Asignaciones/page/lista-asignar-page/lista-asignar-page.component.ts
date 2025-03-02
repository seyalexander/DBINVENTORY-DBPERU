import { Component } from '@angular/core';
import { TablaInventariosAsignadosComponent } from '@modules/Asignaciones/components/tabla-inventarios-asignados/tabla-inventarios-asignados.component';
@Component({
  selector: 'lista-asignar-page',
  standalone: true,
  imports: [
    TablaInventariosAsignadosComponent
  ],
  templateUrl: './lista-asignar-page.component.html',
  styleUrl: './lista-asignar-page.component.css'
})
export class ListaAsignarPageComponent {


}
