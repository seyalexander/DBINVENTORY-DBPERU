import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestConsultaRuc } from 'src/app/Domain/models/empresas/RequestConsultaRuc.model';
import { ResponseConsultaRuc } from 'src/app/Domain/models/empresas/ResponseConsultaRuc.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConsultarucService {
 private readonly URL = environment.API_URL;


  public consultaRuc(ruc: RequestConsultaRuc): Observable<ResponseConsultaRuc> {
    return this.httpCliente
    .post<ResponseConsultaRuc>(`${this.URL}/ConsultaRuc`, ruc, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  constructor(private readonly httpCliente: HttpClient) { }
}
