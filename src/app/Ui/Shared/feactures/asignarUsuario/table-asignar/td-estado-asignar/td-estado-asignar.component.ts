import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-estado-asignar',
  standalone: true,
  imports: [],
  templateUrl: './td-estado-asignar.component.html',
  styleUrl: './td-estado-asignar.component.css'
})
export class TdEstadoAsignarComponent {
  @Input() estado: string = ""
}
