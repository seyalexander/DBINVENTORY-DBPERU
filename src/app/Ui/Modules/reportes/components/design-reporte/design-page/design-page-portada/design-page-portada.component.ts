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
  nombreUsuarioGeneroReporte: string = ""

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    const usuario = sessionStorage.getItem('admin')
    this.nombreUsuarioGeneroReporte = usuario || 'System'
  }

}
