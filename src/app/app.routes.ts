import { Routes } from '@angular/router';
import { LoginPageComponent } from './Ui/Modules/login/page/login-page/login-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./Ui/Modules/inicio/inicio.component').then(m=>m.InicioComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./Ui/Modules/Dashboard/Page/dashboard-inicio/dashboard-inicio.component').then(m=>m.DashboardInicioComponent),
      },
      {
        path: 'modulos',
        loadComponent: () => import('./Ui/Modules/modulos/page/lista-modulo-page/lista-modulo-page.component').then(m=>m.ListaModuloPageComponent),
        children: [
          {
            path: 'CargarInventario',
            loadChildren: () => import('./Ui/Modules/Carga_Inventario/carga_inventario.routes').then(m=>m.CARGA_INVENTARIOS_ROUTES),
          },
          {
            path: 'CargarInventario',
            loadChildren: () => import('./Ui/Modules/Carga_Inventario/carga_inventario.routes').then(m=>m.CARGA_INVENTARIOS_ROUTES),
          },
          {
            path: 'configuracion',
            loadChildren: () => import('./Ui/Modules/configuration/configuracion.routes').then(m=>m.CONFIGURACION_ROUTES)
          },
          {
            path: 'asignaciones',
            loadChildren: () => import('./Ui/Modules/Asignaciones/asignaciones.routes').then(m=>m.ASIGNACIONES_INVENTARIOS_ROUTES),
          },
          {
            path: 'reportes',
            loadChildren: () => import('./Ui/Modules/reportes/reportes.routes').then(m=>m.REPORTES_ROUTES),
          }
        ]
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
