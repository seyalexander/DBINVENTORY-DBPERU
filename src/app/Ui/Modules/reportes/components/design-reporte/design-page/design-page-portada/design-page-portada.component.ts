import { Component, Input } from '@angular/core';

@Component({
  selector: 'design-page-portada',
  standalone: true,
  imports: [],
  templateUrl: './design-page-portada.component.html',
  styleUrl: './design-page-portada.component.css'
})
export class DesignPagePortadaComponent {
  @Input() nombreInventario: string = ""
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

}
