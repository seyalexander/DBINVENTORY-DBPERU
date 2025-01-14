import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuOpcionesComponent } from '../menu-opciones copy/menu-opciones.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    MenuOpcionesComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
