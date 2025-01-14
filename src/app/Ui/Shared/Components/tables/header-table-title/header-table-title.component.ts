import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-table-title',
  standalone: true,
  imports: [],
  templateUrl: './header-table-title.component.html',
  styleUrl: './header-table-title.component.css'
})
export class HeaderTableTitleComponent {
  @Input() title: string = ""
  @Input() descripcionPage: string = ""
  @Input() enlace: string = ""
}
