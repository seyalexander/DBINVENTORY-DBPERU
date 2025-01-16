
import { inventariosGateway } from '../../../Domain/models/inventarios/gateway/inventarios-gateway';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { inventariosModel } from '../../../Domain/models/inventarios/inventarios.models';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventariosService extends inventariosGateway{

  private readonly URL = environment.api;

  override getInventarios(): Observable<Array<inventariosModel>> {
    return this.httpClient.get<inventariosModel[]>(`${this.URL}/Inventarios`)
  }

  override getInventariosFiltroUsuarioAsignado(filtro: 'todos' | 'asignados' | 'noAsignados'): Observable<inventariosModel[]> {
    return this.httpClient.get<inventariosModel[]>(`${this.URL}/Inventarios`).pipe(
      map((inventarios) => {
        let filteredInventarios = inventarios;

        // if (filtro === 'asignados') {
        //   filteredInventarios = inventarios.filter(inventario =>
        //     inventario.usuarioAsignado?.trim() !== '' && inventario.usuarioAsignado != null
        //   );
        // }

        if (filtro === 'noAsignados') {
          filteredInventarios = inventarios.filter(inventario =>
            inventario.usuarioAsignado?.trim() === '' || inventario.usuarioAsignado == null
          );
        }

        return filteredInventarios;
      })
    );
  }

  override getInventarioById(rucEmpresa: string, idCarga: number): Observable<inventariosModel> {
      return this.httpClient.get<inventariosModel>(`${this.URL}/Inventarios/${rucEmpresa}/${idCarga}`)
  }

  override newCabecera(cabecera: inventariosModel): Observable<Object> {
      return this.httpClient.post(`${this.URL}/Inventarios/Cabecera`, cabecera)
  }

  override getUltimaCabceraRegistrada(rucEmpresa: string): Observable<number> {
      return this.httpClient.get<number>(`${this.URL}/Inventarios/idCarga/${rucEmpresa}`)
  }

  override updateUsuarioAsignado(rucEmpresa: string, idCarga: number, usuarioId: string): Observable<Object> {
    const payload = usuarioId;
    return this.httpClient.put(`${this.URL}/Inventarios/${rucEmpresa}/${idCarga}/usuarioAsignado`, payload);
  }

  constructor(private readonly httpClient: HttpClient) { super()}
}
