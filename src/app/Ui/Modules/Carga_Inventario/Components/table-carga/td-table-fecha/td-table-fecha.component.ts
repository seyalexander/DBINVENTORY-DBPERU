import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-table-fecha',
  standalone: true,
  imports: [],
  templateUrl: './td-table-fecha.component.html',
  styleUrl: './td-table-fecha.component.css'
})
export class TdTableFechaComponent {
 @Input() descripcion:string = ""
}
