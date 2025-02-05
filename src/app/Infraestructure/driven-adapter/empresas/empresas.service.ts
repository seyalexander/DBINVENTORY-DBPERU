import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresasModel } from '../../../Domain/models/empresas/empresas.model';
import { MensajeResponseEmpresas } from 'src/app/Domain/models/empresas/ResponseEmpresas.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private readonly URL = environment.api;


  public ListarEmpresas(): Observable<MensajeResponseEmpresas> {
    return this.httpCliente
      .get<MensajeResponseEmpresas>(`${this.URL}/ObtenerEmpresas`, {
        headers: { 'Content-Type': 'application/json' },
      })
  }

  public newEmpresa(empresas: EmpresasModel): Observable<object> {
    return this.httpCliente
    .post(`${this.URL}/RegistrarEmpresa`, empresas, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  constructor(private readonly httpCliente: HttpClient) { }
}
