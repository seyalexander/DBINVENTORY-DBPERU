import { Component } from '@angular/core';
import { OpcionesHeaderUsuarioComponent } from '../../../../configuration/Configuration_home/components/opciones-header-usuario/opciones-header-usuario.component';

@Component({
  selector: 'header-carga-inventario',
  standalone: true,
  imports: [OpcionesHeaderUsuarioComponent],
  templateUrl: './header-carga-inventario.component.html',
  styleUrl: './header-carga-inventario.component.css'
})
export class HeaderCargaInventarioComponent {

}
