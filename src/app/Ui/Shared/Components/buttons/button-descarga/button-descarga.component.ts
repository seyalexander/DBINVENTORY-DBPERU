import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'button-descarga',
  standalone: true,
  imports: [],
  templateUrl: './button-descarga.component.html',
  styleUrl: './button-descarga.component.css'
})
export class ButtonDescargaComponent {
  @Output() funcionDescarga = new EventEmitter<void>()
  descargar() {
    this.funcionDescarga.emit()
  }

}
