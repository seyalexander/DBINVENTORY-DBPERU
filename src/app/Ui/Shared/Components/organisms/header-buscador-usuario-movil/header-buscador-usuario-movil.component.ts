import { Component } from '@angular/core';
import { OpcionesHeaderUsuarioComponent } from '@modules/configuration/Configuration_home/components/opciones-header-usuario/opciones-header-usuario.component';

@Component({
  selector: 'header-buscador-usuario-movil',
  standalone: true,
  imports: [
    OpcionesHeaderUsuarioComponent
  ],
  templateUrl: './header-buscador-usuario-movil.component.html',
  styleUrl: './header-buscador-usuario-movil.component.css'
})
export class HeaderBuscadorUsuarioMovilComponent {

}
