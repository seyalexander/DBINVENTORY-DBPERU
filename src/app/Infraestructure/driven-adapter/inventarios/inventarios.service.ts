import { inventariosGateway } from '../../../Domain/models/inventarios/gateway/inventarios-gateway';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { inventariosModel } from '../../../Domain/models/inventarios/inventarios.models';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { requestAsignarUsuario } from 'src/app/Domain/models/inventarios/requestAsignarUsuario.model';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';

@Injectable({
  providedIn: 'root',
})
export class InventariosService extends inventariosGateway {
  private readonly URL = environment.api;


  override getInventarios(): Observable<Array<inventariosModel>> {
    return this.httpClient
      .get<inventariosModel[]>(`${this.URL}/CabeceraCargaDExcels_index`, {
        headers: { 'Content-Type': 'application/json' },
      })
  }

  override getInventariosFiltroUsuarioAsignado(
    filtro: 'todos' | 'asignados' | 'noAsignados'
  ): Observable<inventariosModel[]> {
    return this.httpClient
      .get<inventariosModel[]>(`${this.URL}/CabeceraCargaDExcels_index`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((inventarios) => {
          let filteredInventarios = inventarios;

          if (filtro === 'noAsignados') {
            filteredInventarios = inventarios.filter(
              (inventario) =>
                inventario.usuarioAsignado?.trim() === '' ||
                inventario.usuarioAsignado == null
            );
          }

          return filteredInventarios;
        })
      );
  }

  override newCabecera(cabecera: inventariosModel): Observable<Object> {
    return this.httpClient
      .post(`${this.URL}/CabeceraCargaDExcels_registrarCabeceraCargaExcels`, cabecera, {
        headers: { 'Content-Type': 'application/json' },
      })
  }

  override updateUsuarioAsignado(requUser: requestAsignarUsuario): Observable<Object> {
    return this.httpClient
      .post<inventariosModel[]>(`${this.URL}/CabeceraCargaDExcels_actualizarUsuarioAsignado`, requUser,{
        headers: { 'Content-Type': 'application/json' },
      })
  }

  override getInventarioById(reqDatos: requestDatosasignar): Observable<inventariosModel> {
    const params = new HttpParams()
      .set('rucempresa', reqDatos.rucempresa)
      .set('idCarga', reqDatos.idcarga);

    return this.httpClient.get<inventariosModel>(
      `${this.URL}/CabeceraCargaDExcels_obtenerCargaPorId`,
      { params }
    );
  }

  override getUltimaCabceraRegistrada(rucEmpresa: string): Observable<number> {
    return this.httpClient.get<number>(
      `${this.URL}/Inventarios/idCarga/${rucEmpresa}`
    );
  }

  constructor(private readonly httpClient: HttpClient) {
    super();
  }
}
