import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';

@Component({
  selector: 'detalle-usuario-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './detalle-usuario-page.component.html',
  styleUrl: './detalle-usuario-page.component.css'
})
export class DetalleUsuarioPageComponent {
  @Input() datosUsuario: SeguridadModel = {} as SeguridadModel;
}
