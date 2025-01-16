import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-fecha-asignar',
  standalone: true,
  imports: [],
  templateUrl: './td-fecha-asignar.component.html',
  styleUrl: './td-fecha-asignar.component.css'
})
export class TdFechaAsignarComponent {
  @Input() fecha: string = ""
}
