import { Routes } from '@angular/router';
import { AsignacionesComponent } from './page/asignaciones/asignaciones.component';

export const ASIGNACIONES_INVENTARIOS_ROUTES: Routes = [
  {
    path: '',
    component: AsignacionesComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./page/lista-asignar-page/lista-asignar-page.component').then(m => m.ListaAsignarPageComponent)
      }
    ]
  }
];
