import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Subscription } from 'rxjs';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { GetUsuariosUseCases } from 'src/app/Domain/use-case/seguridad/get-usuarios-useCase';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';

@Component({
  selector: 'section-grafica-inventarios-asignados',
  standalone: true,
  imports: [
    CommonModule,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './section-grafica-inventarios-asignados.component.html',
  styleUrl: './section-grafica-inventarios-asignados.component.css'
})
export class SectionGraficaInventariosAsignadosComponent {

  // URL: 'https://canvasjs.com/angular-charts/'

  private _usuario = inject(SeguridadService);
  private seguridadSubscription: Subscription | undefined;
  private cdr = inject(ChangeDetectorRef);

  DatosUsuarios: Array<SeguridadModel> = [];

  chartOptions: any = {
    title: {
      text: "Cantidad de Usuarios por Empresa"
    },
    data: [{
      type: "column",
      dataPoints: []
    }]
  };

  ngOnInit(): void {
    this.listaUsuarios();
  }

  listaUsuarios() {
    this.seguridadSubscription = this._usuario
      .ListarUsuarios()
      .subscribe((response: MensajeSeguridadModel) => {
        this.DatosUsuarios = response.usuarios;
        this.actualizarGrafico();
      });
  }

  actualizarGrafico() {
    // 1. Contar usuarios por RUC
    const conteoPorRUC: { [key: string]: number } = this.DatosUsuarios.reduce((acc, usuario) => {
      acc[usuario.rucempresa] = (acc[usuario.rucempresa] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // 2. Convertir a formato dataPoints
    const dataPoints = Object.entries(conteoPorRUC).map(([ruc, cantidad]) => ({
      label: ruc,
      y: cantidad
    }));

    // 3. **Forzar la actualización de Angular**
    this.chartOptions = {
      ...this.chartOptions,
      data: [{ type: "column", dataPoints }]
    };

    this.cdr.detectChanges(); // 🔥 Importante: Forzar detección de cambios
  }


}
