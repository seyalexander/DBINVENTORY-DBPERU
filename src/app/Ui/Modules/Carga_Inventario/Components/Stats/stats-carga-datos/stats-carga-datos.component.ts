import { Component, Input } from '@angular/core';

@Component({
  selector: 'stats-carga-datos',
  standalone: true,
  imports: [],
  templateUrl: './stats-carga-datos.component.html',
  styleUrl: './stats-carga-datos.component.css'
})
export class StatsCargaDatosComponent {
  @Input() NombreStat: string = ""
  @Input() ValorStat: number = 0
}
