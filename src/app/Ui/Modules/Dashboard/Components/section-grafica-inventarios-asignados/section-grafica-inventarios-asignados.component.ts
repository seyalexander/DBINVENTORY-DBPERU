import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Subscription } from 'rxjs';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';
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
  private readonly listaInventarios = inject(InventariosUseCases);
  private seguridadSubscription: Subscription | undefined;
  private inventarioSubscription: Subscription | undefined;
  private cdr = inject(ChangeDetectorRef);

  DatosUsuarios: Array<SeguridadModel> = [];
  datosInventarioslista: Array<inventariosModel> = [];

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

    listarInventarios() {
      try {
        this.inventarioSubscription = this.listaInventarios
          .getInventarios()
          .subscribe({
            next: (response: inventariosModel[]) => {
              if (Array.isArray(response)) {
                this.datosInventarioslista = response;
              } else {
                this.datosInventarioslista = [];

              }
            },
            error: (error) => {
              this.datosInventarioslista = [];
            },
          });
      } catch (err) {
      }
    }


  actualizarGrafico() {
    const conteoPorRUC: { [key: string]: number } = this.DatosUsuarios.reduce((acc, usuario) => {
      acc[usuario.rucempresa] = (acc[usuario.rucempresa] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const dataPoints = Object.entries(conteoPorRUC).map(([ruc, cantidad]) => ({
      label: ruc,
      y: cantidad
    }));

    this.chartOptions = {
      ...this.chartOptions,
      data: [{ type: "column", dataPoints }]
    };

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.inventarioSubscription) {
      this.inventarioSubscription.unsubscribe();
    }

    if (this.seguridadSubscription) {
      this.seguridadSubscription.unsubscribe();
    }
  }


}
