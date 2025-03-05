import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestInsertarMapeo } from 'src/app/Domain/models/mapeoColumnas/mapeoColumnas.model';
import { MapeoObtenerMapeoById } from 'src/app/Domain/models/mapeoColumnas/mapeoObtenerMapeoById.mode';
import { RequestActualizarMapeo } from 'src/app/Domain/models/mapeoColumnas/RequestActualizarMapeo.model';
import { ResponseMapeo } from 'src/app/Domain/models/mapeoColumnas/ResponseMapeo.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MapeoCamposService {
  private readonly URL = environment.api;


  UpdateMapeoById(
    reqDatos: MapeoObtenerMapeoById
  ): Observable<ResponseMapeo> {
    return this.httpClient.post<ResponseMapeo>(
      `${this.URL}/ActualizarMapeoCampos`,
      reqDatos,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  newMapeo(cabecera: RequestInsertarMapeo): Observable<ResponseMapeo> {
    return this.httpClient.post<ResponseMapeo>(
      `${this.URL}/InsertarMapeoCampos`,
      cabecera,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  getMapeoById(usuarioId:MapeoObtenerMapeoById): Observable<RequestInsertarMapeo> {
    return this.httpClient.post<RequestInsertarMapeo>(
      `${this.URL}/ObtenerMapeoCamposById`,
      usuarioId,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }


  constructor(private readonly httpClient: HttpClient) { }
}
