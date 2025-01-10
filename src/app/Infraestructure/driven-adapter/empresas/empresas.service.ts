import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EmpresasGateway } from '../../../Domain/models/empresas/gateway/empresas-gateway';
import { Observable } from 'rxjs';
import { EmpresasModel } from '../../../Domain/models/empresas/empresas.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService extends EmpresasGateway{
  private readonly URL = environment.api;

  override ListarEmpresas(): Observable<Array<EmpresasModel>> {
     return  this.httpCliente.get<EmpresasModel[]>(`${this.URL}/Empresas`)
  }

  override newEmpresa(empresas: EmpresasModel): Observable<object> {
      return this.httpCliente.post(`${this.URL}/Empresa/Save`, empresas)
  }

  constructor(private readonly httpCliente: HttpClient) { super()}
}
