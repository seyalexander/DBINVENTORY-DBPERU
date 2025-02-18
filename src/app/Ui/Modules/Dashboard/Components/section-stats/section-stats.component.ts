import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { InventariosUseCases } from 'src/app/Domain/use-case/inventarios/get-inventarios-useCase';

@Component({
  selector: 'section-stats',
  standalone: true,
  imports: [ ],
  templateUrl: './section-stats.component.html',
  styleUrl: './section-stats.component.css',
})
export class SectionStatsComponent {

  private seguridadSubscription: Subscription | undefined;
  private inventarioSubscription: Subscription | undefined;
  private inventarioTrabajadosSubscription: Subscription | undefined;
  private inventarioAsignadosSubscription: Subscription | undefined;
  private inventarioNoAsignadosSubscription: Subscription | undefined;

  DatosUsuarios: number = 0;
  datosInventarioslista: number = 0;
  datosInventariosAsignados: number = 0
  datosInventariosNoAsignados: number = 0
  datosInventariosTrabajados: number = 0
  cantidadUsuarios: number = 0;
  p: number = 1;

  constructor(
    private readonly _usuario: SeguridadService,
  ) {}
  private readonly listaInventarios = inject(InventariosUseCases);


  ngOnInit(): void {
    this.listaUsuarios();
    this.listarInventarios()
    this.listarInventariosAsignados()
    this.listarInventariosNoAsignados()
    this.listarInventariosTrabajados()
  }



  listaUsuarios() {
    this.seguridadSubscription = this._usuario
      .ListarUsuarios()
      .subscribe((response: MensajeSeguridadModel) => {
        this.DatosUsuarios = response.usuarios.length;
      });
  }



  listarInventarios() {
    try {
      this.inventarioSubscription = this.listaInventarios
        .getInventarios()
        .subscribe({
          next: (response: inventariosModel[]) => {
            this.datosInventarioslista = response.length;
          },
          error: (error) => {

            this.datosInventarioslista = 0;
          },
        });
    } catch (err) {
    }
  }


  listarInventariosAsignados() {
    try {
      this.inventarioAsignadosSubscription = this.listaInventarios
        .getInventarios()
        .subscribe({
          next: (response: inventariosModel[]) => {
            const inventariosConUsuarioAsignado = response.filter(
              (inventario) => inventario.UsuarioAsignado && inventario.UsuarioAsignado.trim() !== ''
            );

            this.datosInventariosAsignados = inventariosConUsuarioAsignado.length;
          },
          error: (error) => {
            this.datosInventariosAsignados = 0;
          },
        });
    } catch (err) {
    }
  }

  listarInventariosNoAsignados() {
    try {
      this.inventarioNoAsignadosSubscription = this.listaInventarios
        .getInventarios()
        .subscribe({
          next: (response: inventariosModel[]) => {
            const inventariosConUsuarioAsignado = response.filter(
              (inventario) => !inventario.UsuarioAsignado || inventario.UsuarioAsignado.trim() == ''
            );

            this.datosInventariosNoAsignados = inventariosConUsuarioAsignado.length;
          },
          error: (error) => {
            this.datosInventariosNoAsignados = 0;
          },
        });
    } catch (err) {
    }
  }

  listarInventariosTrabajados() {
    this.inventarioTrabajadosSubscription = this.listaInventarios
      .getInventarios()
      .subscribe({
        next: (response: inventariosModel[]) => {
          this.datosInventariosTrabajados = response.filter(
            (inventario) =>
              inventario.estado && inventario.estado.trim() !== '' && inventario.estado.trim() == '2'
          ).length;
        },
        error: () => {
          this.datosInventariosTrabajados = 0;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.seguridadSubscription) {
      this.seguridadSubscription.unsubscribe();
    }

    if (this.inventarioSubscription) {
      this.inventarioSubscription.unsubscribe();
    }

    if (this.inventarioAsignadosSubscription) {
      this.inventarioAsignadosSubscription.unsubscribe();
    }

    if (this.inventarioNoAsignadosSubscription) {
      this.inventarioNoAsignadosSubscription.unsubscribe();
    }

    this.inventarioTrabajadosSubscription?.unsubscribe()
  }
}
