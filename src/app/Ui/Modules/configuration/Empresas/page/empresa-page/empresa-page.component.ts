import { Component } from '@angular/core';
import { TableListaEmpresasComponent } from '../../components/tables/table-lista-empresas/table-lista-empresas.component';

@Component({
  selector: 'app-empresa-page',
  standalone: true,
  imports: [TableListaEmpresasComponent],
  templateUrl: './empresa-page.component.html',
  styleUrl: './empresa-page.component.css'
})
export class EmpresaPageComponent {

}
