import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuOpcionesGeneralComponent } from 'src/app/Ui/Shared/Components/organisms/menu-opciones/menu-opciones.component';

@Component({
  selector: 'asignaciones',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuOpcionesGeneralComponent
  ],
  templateUrl: './asignaciones.component.html',
  styleUrl: './asignaciones.component.css',
})
export class AsignacionesComponent {

}
