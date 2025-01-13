import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesGateway } from 'src/app/Domain/models/roles/gateway/roles-gateway';
import { RolesModel } from 'src/app/Domain/models/roles/roles.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends RolesGateway{
  private readonly URL = environment.api;

  override ListarRoles(): Observable<Array<RolesModel>> {
      return this.httpCliente.get<RolesModel[]>(`${this.URL}/Roles`)
  }

  constructor(private readonly httpCliente: HttpClient) {super() }
}
