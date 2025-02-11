import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CargaDatosGateway } from './Domain/models/cargaDatos/gateway/cargaDatos-gateway';
import { InventariosGateway } from './Domain/models/inventarios/gateway/inventarios-gateway';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CargaDatosService } from './Infraestructure/driven-adapter/carga_datos/carga-datos.service';
import { InventariosService } from './Infraestructure/driven-adapter/inventarios/inventarios.service';
import { UsuariosGateway } from './Domain/models/seguridad/gateway/seguridad-gateway';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SeguridadService } from './Infraestructure/driven-adapter/seguridad/seguridad.service';
import { RolesGateway } from './Domain/models/roles/gateway/roles-gateway';
import { RolesService } from './Infraestructure/driven-adapter/roles/roles.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    HttpClientModule,
    {provide: CargaDatosGateway, useClass: CargaDatosService},
    {provide: InventariosGateway, useClass: InventariosService},
    {provide: UsuariosGateway, useClass: SeguridadService},
    {provide: RolesGateway, useClass: RolesService},
    {provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ],


};
