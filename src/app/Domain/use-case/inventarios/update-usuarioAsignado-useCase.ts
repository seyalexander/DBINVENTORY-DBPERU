import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { InventariosService } from 'src/app/Infraestructure/driven-adapter/inventarios/inventarios.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateUsuarioAsignadoUseCase {

  constructor(private readonly inventariosService: InventariosService) {}

  updateUsuarioAsignado(rucEmpresa: string, idCarga: number, usuarioId: string): Observable<Object> {
    return this.inventariosService.updateUsuarioAsignado(rucEmpresa, idCarga, usuarioId);
  }
}
