import { TargetOpcionComponent } from 'src/app/Ui/Shared/Components/organisms/targets/target-opcion/target-opcion.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'section-opciones',
  standalone: true,
  imports: [TargetOpcionComponent],
  templateUrl: './section-opciones.component.html',
  styleUrl: './section-opciones.component.css',
})
export class SectionOpcionesComponent {

  //   imagen: 'https://www.dbperu.com/wp-content/uploads/2023/11/6f33b1af7b9de18e6ada8ba811ff89c3-2-scaled.webp',

  mainMenu: {
    defaultOptions: Array<any>;
    accessLink: Array<any>;
  } = {
    defaultOptions: [],
    accessLink: [],
  };

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.rutasDashboard();
    } else {
      this.router.navigate(['/login']);
    }
  }

  rutasDashboard() {
    this.mainMenu.defaultOptions = [
      {
        name: 'Cargar Inventario',
        icon: 'uil uil-estate',
      },
    ];

    this.mainMenu.accessLink = [
      {
        name: 'Cargar Inventario',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/10/bda74cd94c567644eb7bde4971b7a4cf-1024x683.webp',
        route: ['/dashboard', 'CargarInventario'],
      },
      {
        name: 'Asignar',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/10/89430bfd7fbf08fd304924cd92ef6156-1024x683.webp',
        route: ['/dashboard', 'asignaciones'],
      },
      {
        name: 'Reportes',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/11/3b5ee49997fb5e772ede0cc85b7fa5f6-scaled.webp',
        route: ['/dashboard', 'reportes'],
      },
      {
        name: 'Ajustes',
        imagen:
          'https://www.dbperu.com/wp-content/uploads/2023/11/MINERIA_principal-300x200.webp',
        route: ['/dashboard', 'configuracion'],
      },
    ];
  }
}
