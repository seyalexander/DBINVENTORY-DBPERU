import { Component, Input } from '@angular/core';

@Component({
  selector: 'body-table-button-icon',
  standalone: true,
  imports: [],
  templateUrl: './body-table-button-icon.component.html',
  styleUrl: './body-table-button-icon.component.css'
})
export class BodyTableButtonIconComponent {
  @Input() text: string = ""
}
