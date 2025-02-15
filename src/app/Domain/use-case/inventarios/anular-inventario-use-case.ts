import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventariosService } from 'src/app/Infraestructure/driven-adapter/inventarios/inventarios.service';
import { RequestAnularInventario } from '../../models/inventarios/requestAnularInventario.model';
import { ResponseAnularInventario } from '../../models/inventarios/responseAnularInventario.model';

@Injectable({
  providedIn: 'root'
})
export class AnularInventarioUseCase {

  constructor(private readonly inventariosService: InventariosService) {}

  anularInventario(requAnular: RequestAnularInventario): Observable<ResponseAnularInventario> {
    return this.inventariosService.anularInventario(requAnular)
  }
}
