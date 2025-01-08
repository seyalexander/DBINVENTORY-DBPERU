import { Routes } from '@angular/router';
import { LoginPageComponent } from './Ui/Modules/login/page/login-page/login-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./Ui/Modules/Dashboard/Page/dashboard-page/dashboard-page.component').then(m=>m.DashboardPageComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./Ui/Modules/Dashboard/Components/section_opciones.routes').then(m=>m.SECTION_OPCIONES_ROUTES),
      },
      {
        path: 'CargarInventario',
        loadChildren: () => import('./Ui/Modules/Carga_Inventario/carga_inventario.routes').then(m=>m.CARGA_INVENTARIOS_ROUTES)
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
  {
    path: '**',
    redirectTo: 'login'
  }
];
