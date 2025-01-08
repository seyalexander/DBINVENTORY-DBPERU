import { Component, Input } from '@angular/core';

@Component({
  selector: 'body-table-button',
  standalone: true,
  imports: [],
  templateUrl: './body-table-button.component.html',
  styleUrl: './body-table-button.component.css'
})
export class BodyTableButtonComponent {
  @Input() text: string = ""
}
