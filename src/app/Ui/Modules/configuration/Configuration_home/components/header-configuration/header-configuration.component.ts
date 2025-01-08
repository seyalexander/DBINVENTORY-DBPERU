import { Component } from '@angular/core';
import { OpcionesHeaderUsuarioComponent } from '../opciones-header-usuario/opciones-header-usuario.component';

@Component({
  selector: 'header-configuration',
  standalone: true,
  imports: [OpcionesHeaderUsuarioComponent],
  templateUrl: './header-configuration.component.html',
  styleUrl: './header-configuration.component.css'
})
export class HeaderConfigurationComponent {

}
