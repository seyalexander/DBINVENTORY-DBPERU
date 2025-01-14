import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuOpcionesGeneralComponent } from '../menu-opciones/menu-opciones.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    MenuOpcionesGeneralComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
