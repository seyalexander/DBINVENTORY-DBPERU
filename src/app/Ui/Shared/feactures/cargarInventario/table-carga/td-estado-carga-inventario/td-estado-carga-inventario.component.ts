import { Component, Input } from '@angular/core';
import { TdEstado1Component } from 'src/app/Ui/Shared/Components/tables/td-estado-1/td-estado-1.component';
import { TdEstado2Component } from 'src/app/Ui/Shared/Components/tables/td-estado-2/td-estado-2.component';
import { TdEstado3Component } from 'src/app/Ui/Shared/Components/tables/td-estado-3/td-estado-3.component';

@Component({
  selector: 'td-estado-carga-inventario',
  standalone: true,
  imports: [
    TdEstado1Component,
    TdEstado2Component,
    TdEstado3Component,
  ],
  templateUrl: './td-estado-carga-inventario.component.html',
  styleUrl: './td-estado-carga-inventario.component.css'
})
export class TdEstadoCargaInventarioComponent {
  @Input() estado2: string = ""
  @Input() estado: string = ""
}
