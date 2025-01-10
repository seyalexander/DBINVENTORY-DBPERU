import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-nuevo',
  standalone: true,
  imports: [],
  templateUrl: './button-nuevo.component.html',
  styleUrl: './button-nuevo.component.css'
})
export class ButtonNuevoComponent {
  @Input() abrirModal: string = ''
}
