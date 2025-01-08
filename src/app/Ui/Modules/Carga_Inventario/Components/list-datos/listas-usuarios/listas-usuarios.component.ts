import { Component, Input } from '@angular/core';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';

@Component({
  selector: 'listas-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './listas-usuarios.component.html',
  styleUrl: './listas-usuarios.component.css'
})
export class ListasUsuariosComponent {
  @Input() getUsuarios_all: Array<SeguridadModel> = []
}
