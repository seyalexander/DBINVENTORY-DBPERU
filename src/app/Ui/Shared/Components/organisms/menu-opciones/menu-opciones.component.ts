import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'menu-opciones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-opciones.component.html',
  styleUrls: ['./menu-opciones.component.css'],
})
export class MenuOpcionesGeneralComponent {
  mainMenu: {
    defaultOptions: Array<any>;
    accessLink: Array<any>;
  } = {
    defaultOptions: [],
    accessLink: [],
  };

  ngOnInit(): void {
    this.rutasDashboard();
  }

  private readonly router = inject(Router)

  rutasDashboard() {
    this.mainMenu.accessLink = [
      {
        name: 'Cargar Inventario',
        icon: 'uil uil-estate',
        route: ['/dashboard', 'modulos', 'CargarInventario'],
        subMenu: false,
      },
      // {
      //   name: 'Asignar',
      //   icon: 'uil uil-estate',
      //   route: ['/dashboard', 'modulos', 'asignaciones'],
      //   subMenu: false,
      // },
      {
        name: 'Reportes',
        icon: 'uil uil-estate',
        route: ['/dashboard', 'modulos', 'reportes'],
        subMenu: false,
      },
      {
        name: 'Ajustes',
        icon: 'uil uil-estate',
        subMenu: true,
        listaSubMenu: [
          {
            name: 'Empresas',
            icon: 'uil uil-estate',
            route: ['/dashboard', 'modulos', 'empresas'],
          },
          {
            name: 'Usuarios',
            icon: 'uil uil-estate',
            route: ['/dashboard', 'modulos', 'usuario'],
          },
          {
            name: 'Tipo Usuario',
            icon: 'uil uil-estate',
            route: ['/dashboard', 'modulos', 'tipoUsuario'],
          },
        ],
      },
      {
        name: 'Dashboard',
        icon: 'uil uil-estate',
        route: ['/dashboard'],
        subMenu: false,
      },
    ];
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login']);
  }


}

