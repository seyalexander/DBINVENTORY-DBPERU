import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'target-opcion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './target-opcion.component.html',
  styleUrl: './target-opcion.component.css'
})
export class TargetOpcionComponent {
  @Input() route: string = ""
  @Input() name: string = ""
  @Input() imagen: string = ""

}
