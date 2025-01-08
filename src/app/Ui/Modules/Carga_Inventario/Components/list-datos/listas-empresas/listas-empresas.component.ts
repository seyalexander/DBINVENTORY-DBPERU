import { Component, Input } from '@angular/core';
import { EmpresasModel } from 'src/app/Domain/models/empresas/empresas.model';

@Component({
  selector: 'listas-empresas',
  standalone: true,
  imports: [],
  templateUrl: './listas-empresas.component.html',
  styleUrl: './listas-empresas.component.css'
})
export class ListasEmpresasComponent {
 @Input() getEmpresas_all: Array<EmpresasModel> = []
}
