import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-estado-2',
  standalone: true,
  imports: [],
  templateUrl: './td-estado-2.component.html',
  styleUrl: './td-estado-2.component.css'
})
export class TdEstado2Component {
  @Input() estado: string = 'Inactivo'
}
