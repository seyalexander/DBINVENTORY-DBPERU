import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';

@Component({
  selector: 'menu-opciones',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './menu-opciones.component.html',
  styleUrl: './menu-opciones.component.css',
})
export class MenuOpcionesGeneralComponent {
  mainMenu: {
    defaultOptions: Array<any>;
    accessLink: Array<any>;
  } = {
    defaultOptions: [],
    accessLink: [],
  };

  constructor(
    private readonly seguridadService: SeguridadService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.rutasDashboard();
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.seguridadService.logout();
    this.router.navigate(['/login']);
  }

  rutasDashboard() {
    this.mainMenu.defaultOptions = [
      {
        name: 'Cargar Inventario',
        icon: 'uil uil-estate',
        // route: this.encryptRoute(['/dashboard', 'Cargar_inventario']),
        // route: this.generateEncryptedRoute('Cargar_inventario'),
      },
    ];

    this.mainMenu.accessLink = [
      {
        name: 'Dashboard',
        icon: 'uil uil-estate',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/10/bda74cd94c567644eb7bde4971b7a4cf-1024x683.webp',
        route: ['/dashboard'],
        subMenu: false
      },
      {
        name: 'Cargar Inventario',
        icon: 'uil uil-estate',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/10/bda74cd94c567644eb7bde4971b7a4cf-1024x683.webp',
        route: ['/dashboard', 'modulos', 'CargarInventario'],
        subMenu: false
      },
      {
        name: 'Asignar',
        icon: 'uil uil-estate',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/10/89430bfd7fbf08fd304924cd92ef6156-1024x683.webp',
        route: ['/dashboard', 'modulos', 'asignaciones'],
        subMenu: false
      },
      {
        name: 'Reportes',
        icon: 'uil uil-estate',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/11/3b5ee49997fb5e772ede0cc85b7fa5f6-scaled.webp',
        route: ['/dashboard', 'modulos', 'reportes'],
        subMenu: false
      },
      {
        name: 'Ajustes',
        icon: 'uil uil-estate',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/11/MINERIA_principal-300x200.webp',
        subMenu: true,
        listaSubMenu: [
          {
            name: 'Empresas',
            icon: 'uil uil-estate',
            route: ['/dashboard', 'modulos', 'empresas']
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
          }
        ]
      },
    ];
  }
}
