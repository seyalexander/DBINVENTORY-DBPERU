import { HttpClient } from '@angular/common/http';
import { UsuariosGateway } from '../../../Domain/models/seguridad/gateway/seguridad-gateway';
import { Observable } from 'rxjs';
import { SeguridadModel } from '../../../Domain/models/seguridad/seguridad.model';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { RequestLoginModel } from 'src/app/Domain/models/seguridad/requestLogin.model';
import { ResponseLoginModel } from 'src/app/Domain/models/seguridad/responseLogin.model';
import { RequestDetalleUsuario } from 'src/app/Domain/models/seguridad/requestDetalleUsuario.mode';
import { ReqActualizarUsuario } from 'src/app/Domain/models/seguridad/requestActualizarusuario.mode';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService extends UsuariosGateway {
  private readonly URL = environment.api;

  override ListarUsuarios(): Observable<MensajeSeguridadModel> {
    return this.httpClient.get<MensajeSeguridadModel>(
      `${this.URL}/ObtenerUsuarios`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  override login(
    requestelogin: RequestLoginModel
  ): Observable<ResponseLoginModel> {
    return this.httpClient.post<ResponseLoginModel>(
      `${this.URL}/Login`,
      requestelogin,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  override newUsuario(usuario: SeguridadModel): Observable<object> {
    return this.httpClient.post(`${this.URL}/RegistrarUsuario`, usuario);
  }

  override detalleUsuario(
    reqdetalle: RequestDetalleUsuario
  ): Observable<SeguridadModel> {
    return this.httpClient.post<SeguridadModel>(`${this.URL}/UsuarioById`, reqdetalle, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  actualizarUsuario(
    requestActualizar: ReqActualizarUsuario
  ): Observable<SeguridadModel> {
    return this.httpClient.post<SeguridadModel>(`${this.URL}/ActualizarUsuario`, requestActualizar, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  constructor(private readonly httpClient: HttpClient) {
    super();
  }
}
