import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-estado-3',
  standalone: true,
  imports: [],
  templateUrl: './td-estado-3.component.html',
  styleUrl: './td-estado-3.component.css'
})
export class TdEstado3Component {
 @Input() estado: string = 'Anulado'
}
