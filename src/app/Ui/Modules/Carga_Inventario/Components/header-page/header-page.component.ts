import { Component } from '@angular/core';
import { ButtonNuevoComponent } from 'src/app/Ui/Shared/Components/buttons/button-nuevo/button-nuevo.component';
import { ButtonDescargarPlantillaComponent } from 'src/app/Ui/Shared/feactures/cargarInventario/Buttons/button-descargar-plantilla/button-descargar-plantilla.component';

@Component({
  selector: 'header-page',
  standalone: true,
  imports: [
    ButtonDescargarPlantillaComponent,
    ButtonNuevoComponent
  ],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.css'
})
export class HeaderPageComponent {

}
