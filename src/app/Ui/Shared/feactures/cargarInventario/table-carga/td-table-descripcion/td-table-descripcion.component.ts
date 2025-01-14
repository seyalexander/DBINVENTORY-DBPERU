import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-table-descripcion',
  standalone: true,
  imports: [],
  templateUrl: './td-table-descripcion.component.html',
  styleUrl: './td-table-descripcion.component.css'
})
export class TdTableDescripcionComponent {
  @Input() descripcion:string = ""

}
