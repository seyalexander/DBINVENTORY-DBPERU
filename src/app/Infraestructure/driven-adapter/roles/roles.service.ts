import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesGateway } from 'src/app/Domain/models/roles/gateway/roles-gateway';
import { MensajeRolesModel } from 'src/app/Domain/models/roles/mensajeRoles.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends RolesGateway{
  private readonly URL = environment.api;

  override ListarRoles(estado: string): Observable<MensajeRolesModel> {
    const body = { estado };

    return this.httpCliente.post<MensajeRolesModel>(`${this.URL}/ObtenerRoles`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  constructor(private readonly httpCliente: HttpClient) {super() }
}
