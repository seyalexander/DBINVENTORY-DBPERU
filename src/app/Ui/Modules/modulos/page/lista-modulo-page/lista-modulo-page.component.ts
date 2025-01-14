import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderBuscadorUsuarioMovilComponent } from 'src/app/Ui/Shared/Components/organisms/header-buscador-usuario-movil/header-buscador-usuario-movil.component';
import { HeaderResponsiveComponent } from 'src/app/Ui/Shared/Components/organisms/header-responsive/header-responsive.component';
import { SidebarComponent } from 'src/app/Ui/Shared/Components/organisms/sidebar/sidebar.component';

@Component({
  selector: 'app-lista-modulo-page',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderResponsiveComponent,
    HeaderBuscadorUsuarioMovilComponent
  ],
  templateUrl: './lista-modulo-page.component.html',
  styleUrl: './lista-modulo-page.component.css'
})
export class ListaModuloPageComponent {

}
