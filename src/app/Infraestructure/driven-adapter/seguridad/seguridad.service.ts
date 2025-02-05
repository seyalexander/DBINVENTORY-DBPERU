import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UsuariosGateway } from '../../../Domain/models/seguridad/gateway/seguridad-gateway';
import { map, Observable } from 'rxjs';
import { SeguridadModel } from '../../../Domain/models/seguridad/seguridad.model';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService extends UsuariosGateway{

  private readonly URL = environment.api;

  override ListarUsuarios(): Observable<Array<SeguridadModel>> {
    return this.httpClient.get<SeguridadModel[]>(`${this.URL}/Seguridad`)
  }

  override login(rucempresa: string, idUsuario: string, contrasena: string): Observable<{ token: string, usuario: SeguridadModel }> {
    const params = new HttpParams()
      .set('rucempresa', rucempresa)
      .set('idUsuario', idUsuario)
      .set('contrasena', contrasena);

    return this.httpClient
      .post<{ token: string, usuario: SeguridadModel }>(`${this.URL}/Seguridad/login`, null, { params })
      .pipe(
        map((response) => {
          return {
            token: response.token,
            usuario: response.usuario
          };
        })
      );
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
