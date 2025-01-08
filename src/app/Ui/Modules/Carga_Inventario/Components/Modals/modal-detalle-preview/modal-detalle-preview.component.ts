import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal-detalle-preview',
  standalone: true,
  imports: [],
  templateUrl: './modal-detalle-preview.component.html',
  styleUrl: './modal-detalle-preview.component.css'
})
export class ModalDetallePreviewComponent {
  @Input() excelData: any[] = [];
}
