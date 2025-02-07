import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosGateway } from '../../../Domain/models/seguridad/gateway/seguridad-gateway';
import { Observable } from 'rxjs';
import { SeguridadModel } from '../../../Domain/models/seguridad/seguridad.model';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { RequestLoginModel } from 'src/app/Domain/models/seguridad/requestLogin.model';
import { ResponseLoginModel } from 'src/app/Domain/models/seguridad/responseLogin.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService extends UsuariosGateway{

  private readonly URL = environment.api;

  override ListarUsuarios(): Observable<MensajeSeguridadModel> {
    return this.httpClient
          .get<MensajeSeguridadModel>(`${this.URL}/ObtenerUsuarios`, {
            headers: { 'Content-Type': 'application/json' },
          })
    // return this.httpClient.get<SeguridadModel[]>(`${this.URL}/Seguridad`)
  }

  override login(requestelogin: RequestLoginModel): Observable<ResponseLoginModel> {
    return this.httpClient.post<ResponseLoginModel>(`${this.URL}/Login`, requestelogin,{
            headers: { 'Content-Type': 'application/json' },
          })
  }

  logout(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      this.httpClient.post(`${this.URL}/Seguridad/logout`, null, { headers }).subscribe({
        error: (error) => console.error('Error al invalidar el token en el backend:', error)
      });
    }

    localStorage.removeItem('authToken');
  }

  validarToken(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.httpClient.post(`${this.URL}/Seguridad/validarToken`, null, { headers });
    } else {
      return new Observable(observer => {
        observer.error('Token no encontrado');
      });
    }
  }


  override newUsuario(usuario: SeguridadModel): Observable<object> {
        return this.httpClient.post(`${this.URL}/Seguridad/Save`, usuario)
    }

  constructor(private readonly httpClient: HttpClient) { super() }
}
