import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { RolesModel } from 'src/app/Domain/models/roles/roles.model';
import { HeaderPageTableTipoUsuarioComponent } from '../../header/header-page-table-tipo-usuario/header-page-table-tipo-usuario.component';
import { FooterComponent } from 'src/app/Ui/Shared/Components/organisms/footer/footer.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'

@Component({
  selector: 'table-lista-tipo-usuario',
  standalone: true,
  imports: [
    HeaderPageTableTipoUsuarioComponent,
    FooterComponent,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './table-lista-tipo-usuario.component.html',
  styleUrl: './table-lista-tipo-usuario.component.css'
})
export class TableListaTipoUsuarioComponent implements AfterViewInit  {
  displayedColumns: string[] = ['Rol', 'Estado'];

  @Input() DatosTipoUsuario: Array<RolesModel> = []
  dataSource = new MatTableDataSource<RolesModel>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['DatosTipoUsuario']) {
      this.dataSource.data = this.DatosTipoUsuario || [];
    }
  }


}
