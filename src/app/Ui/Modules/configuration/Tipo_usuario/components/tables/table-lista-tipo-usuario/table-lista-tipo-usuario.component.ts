import {
  AfterViewInit,
  Component,
  effect,
  Input,
  Signal,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RolesModel } from 'src/app/Domain/models/roles/roles.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TdEstado3Component } from 'src/app/Ui/Shared/Components/tables/td-estado-3/td-estado-3.component';
import { TdEstado2Component } from 'src/app/Ui/Shared/Components/tables/td-estado-2/td-estado-2.component';
import { TdEstado1Component } from 'src/app/Ui/Shared/Components/tables/td-estado-1/td-estado-1.component';
import { icon } from 'leaflet';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'table-lista-tipo-usuario',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    TdEstado3Component,
    TdEstado2Component,
    TdEstado1Component,
    MatIcon
  ],
  templateUrl: './table-lista-tipo-usuario.component.html',
  styleUrl: './table-lista-tipo-usuario.component.css',
})
export class TableListaTipoUsuarioComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['Rol', 'Estado'];
  dataSource = new MatTableDataSource<RolesModel>([]);

  @Input() set DatosRoles(value: RolesModel[]) {
    this._datosTipoUsuario.set(value);
  }

  private _datosTipoUsuario = signal<RolesModel[]>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this._datosTipoUsuario();
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  get DatosTipoUsuario(): Signal<RolesModel[]> {
    return this._datosTipoUsuario;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
