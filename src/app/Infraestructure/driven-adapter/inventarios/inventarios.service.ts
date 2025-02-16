import { InventariosGateway } from '../../../Domain/models/inventarios/gateway/inventarios-gateway';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { inventariosModel } from '../../../Domain/models/inventarios/inventarios.models';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { RequestAsignarUsuario } from 'src/app/Domain/models/inventarios/requestAsignarUsuario.model';
import { requestDatosasignar } from 'src/app/Domain/models/inventarios/requestObtenerDatosAsignar.model';
import { ResponseAsignacionModel } from 'src/app/Domain/models/inventarios/responseAsignacion.model';
import { detalleCarga } from 'src/app/Domain/models/cargaDatos/cargaDatos.model';
import { RequestObtenerDetalle } from 'src/app/Domain/models/inventarios/requestObtenerDetalle.model';
import { RequestAnularInventario } from 'src/app/Domain/models/inventarios/requestAnularInventario.model';
import { ResponseAnularInventario } from 'src/app/Domain/models/inventarios/responseAnularInventario.model';
import { RequestInventarioByFiltros } from 'src/app/Domain/models/inventarios/requestInventariosByFiltros.model';

@Injectable({
  providedIn: 'root',
})
export class InventariosService extends InventariosGateway {
  private readonly URL = environment.api;

  //================================================================================
  // CONSUMO DE API
  //================================================================================

  override getInventarios(): Observable<Array<inventariosModel>> {
    return this.httpClient.get<inventariosModel[]>(
      `${this.URL}/CabeceraCargaDExcels_index`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
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

  override getInventarioById(
    reqDatos: requestDatosasignar
  ): Observable<inventariosModel> {
    const params = new HttpParams()
      .set('rucempresa', reqDatos.rucempresa)
      .set('idCarga', reqDatos.idcarga);

    return this.httpClient.get<inventariosModel>(
      `${this.URL}/CabeceraCargaDExcels_obtenerCargaPorId`,
      {
        headers: { 'Content-Type': 'application/json' },
        params: params,
      }
    );
  }

  override newCabecera(cabecera: inventariosModel): Observable<Object> {
    return this.httpClient.post(
      `${this.URL}/CabeceraCargaDExcels_registrarCabeceraCargaExcels`,
      cabecera,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  override getDetalleInventario(
    reqDetalle: RequestObtenerDetalle
  ): Observable<Array<detalleCarga>> {
    return this.httpClient.post<detalleCarga[]>(
      `${this.URL}/ObtenerDetalleInventario`,
      reqDetalle,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  override updateUsuarioAsignado(
    requUser: RequestAsignarUsuario
  ): Observable<ResponseAsignacionModel> {
    return this.httpClient.post<ResponseAsignacionModel>(
      `${this.URL}/CabeceraCargaDExcels_actualizarUsuarioAsignado`,
      requUser,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  override getUltimaCabceraRegistrada(rucEmpresa: string): Observable<number> {
    return this.httpClient.get<number>(
      `${this.URL}/Inventarios/idCarga/${rucEmpresa}`
    );
  }

  override anularInventario(requAnular: RequestAnularInventario): Observable<ResponseAnularInventario> {
    return this.httpClient.post<ResponseAnularInventario>(
      `${this.URL}/AnularInventario`,
      requAnular,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  override getInventariosByFiltros(requFiltros: RequestInventarioByFiltros): Observable<Array<inventariosModel>> {
    return this.httpClient.post<inventariosModel[]>(
      `${this.URL}/InventariosByFiltros`,
      requFiltros,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  //================================================================================
  // SERVICIO BÚSQUEDAS
  //================================================================================
  private readonly filtroSubject = new BehaviorSubject<string>('');
  filtro$ = this.filtroSubject.asObservable();

  actualizarFiltro(valor: string) {
    this.filtroSubject.next(valor);
  }
}
