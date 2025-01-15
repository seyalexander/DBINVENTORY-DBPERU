import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TablaInventariosAsignadosComponent } from '@modules/Asignaciones/components/tabla-inventarios-asignados/tabla-inventarios-asignados.component';



@Component({
  selector: 'lista-asignar-page',
  standalone: true,
  imports: [
    NgxPaginationModule,
    TablaInventariosAsignadosComponent
  ],
  templateUrl: './lista-asignar-page.component.html',
  styleUrl: './lista-asignar-page.component.css'
})
export class ListaAsignarPageComponent {


}
