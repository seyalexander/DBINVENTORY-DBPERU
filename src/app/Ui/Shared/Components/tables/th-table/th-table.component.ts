import { Component, Input } from '@angular/core';

@Component({
  selector: 'th-table',
  standalone: true,
  imports: [],
  templateUrl: './th-table.component.html',
  styleUrl: './th-table.component.css'
})
export class ThTableComponent {
  @Input() descripcion: string = ""
}
