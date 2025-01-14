import { Component } from '@angular/core';
import { ButtonNuevoComponent } from 'src/app/Ui/Shared/Components/buttons/button-nuevo/button-nuevo.component';

@Component({
  selector: 'button-nuevo-inventario',
  standalone: true,
  imports: [ButtonNuevoComponent],
  templateUrl: './button-nuevo-inventario.component.html',
  styleUrl: './button-nuevo-inventario.component.css'
})
export class ButtonNuevoInventarioComponent {

}
