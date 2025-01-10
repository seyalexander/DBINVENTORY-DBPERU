import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-table-usuario-creador',
  standalone: true,
  imports: [],
  templateUrl: './td-table-usuario-creador.component.html',
  styleUrl: './td-table-usuario-creador.component.css'
})
export class TdTableUsuarioCreadorComponent {
  @Input() descripcion:string = ""
}
