import { Component, Input } from '@angular/core';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';
import { Sucursales } from 'src/app/Domain/models/empresas/sucursales.model';

@Component({
  selector: 'detalle-empresa-page',
  standalone: true,
  imports: [],
  templateUrl: './detalle-empresa-page.component.html',
  styleUrl: './detalle-empresa-page.component.css'
})
export class DetalleEmpresaPageComponent {
  @Input() detalleEmpresa: EmpresasModel = {} as EmpresasModel
  @Input() listaSucursales: Array<Sucursales> = []
}
