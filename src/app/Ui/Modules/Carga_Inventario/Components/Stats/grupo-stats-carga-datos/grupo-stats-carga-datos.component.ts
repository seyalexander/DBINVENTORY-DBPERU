import { Component, Input } from '@angular/core';
import { StatsCargaDatosComponent } from '../stats-carga-datos/stats-carga-datos.component';

@Component({
  selector: 'grupo-stats-carga-datos',
  standalone: true,
  imports: [StatsCargaDatosComponent],
  templateUrl: './grupo-stats-carga-datos.component.html',
  styleUrl: './grupo-stats-carga-datos.component.css'
})
export class GrupoStatsCargaDatosComponent {
  @Input() ValorInventariosCreados: number = 0
  @Input() ValorInventariosAsignados: number = 0
  @Input() ValorInventariosActivos: number = 0
  @Input() ValorInventariosPorEmpresa: number = 0
}
