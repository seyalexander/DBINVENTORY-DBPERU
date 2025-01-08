import { Routes } from '@angular/router';
import { AsignacionesComponent } from './page/asignaciones/asignaciones.component';

export const ASIGNACIONES_INVENTARIOS_ROUTES: Routes = [
  {
    path: '',
    component: AsignacionesComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./inventarios/components/asignacion-inventario/asignacion-inventario.component').then(m => m.AsignacionInventarioComponent)
      }
    ]
  }
];
