import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'button-usuario-logueado',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './button-usuario-logueado.component.html',
  styleUrl: './button-usuario-logueado.component.css'
})
export class ButtonUsuarioLogueadoComponent {

  private readonly router = inject(Router)
  IrUsuarioLogin():void {
    this.router.navigate(['/dashboard', 'modulos', 'usuarioLogueado'])
  }
}
