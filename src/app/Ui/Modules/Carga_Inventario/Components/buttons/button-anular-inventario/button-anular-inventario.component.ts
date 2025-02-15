import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';

@Component({
  selector: 'button-anular-inventario',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './button-anular-inventario.component.html',
  styleUrl: './button-anular-inventario.component.css'
})
export class ButtonAnularInventarioComponent {

  @Input() datosInventario: inventariosModel = {} as inventariosModel;
  @Input() rucempresa: string = ''
  @Input() idcarga: number = 0

  @Output() obtenerDetalle = new EventEmitter<{ rucempresa: string; idcarga: number }>();

  ObtenerDetatosInventarios() {
    this.obtenerDetalle.emit({ rucempresa: this.rucempresa, idcarga: this.idcarga });
  }

}
