import { Component, Input } from '@angular/core';

@Component({
  selector: 'footer-table',
  standalone: true,
  imports: [],
  templateUrl: './footer-table.component.html',
  styleUrl: './footer-table.component.css'
})
export class FooterTableComponent {
  @Input() text: number = 0
}
