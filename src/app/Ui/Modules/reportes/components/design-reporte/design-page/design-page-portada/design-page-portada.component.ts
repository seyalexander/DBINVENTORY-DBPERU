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
    const usuarioString = localStorage.getItem('usuarioLogueado');

    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.nombreUsuarioGeneroReporte = usuario.nombreusuario +' '+usuario.apellido;
    } else {
      return;
    }
  }

}
