import { Component } from '@angular/core';
import { ButtonDescargarPlantillaComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/Buttons/button-descargar-plantilla/button-descargar-plantilla.component';
import { ButtonNuevoInventarioComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/Buttons/button-nuevo-inventario/button-nuevo-inventario.component';


@Component({
  selector: 'header-page',
  standalone: true,
  imports: [
    ButtonDescargarPlantillaComponent,
    ButtonNuevoInventarioComponent
  ],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.css'
})
export class HeaderPageComponent {

}
