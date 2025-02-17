import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MensajeSeguridadModel } from 'src/app/Domain/models/seguridad/mensajeSeguridad.model';
import { SeguridadService } from 'src/app/Infraestructure/driven-adapter/seguridad/seguridad.service';

@Component({
  selector: 'section-stats',
  standalone: true,
  imports: [],
  templateUrl: './section-stats.component.html',
  styleUrl: './section-stats.component.css',
})
export class SectionStatsComponent {
  private seguridadSubscription: Subscription | undefined;
  DatosUsuarios: number = 0;
  cantidadUsuarios: number = 0;
  p: number = 1;

  constructor(private readonly _usuario: SeguridadService) {}

  ngOnInit(): void {
    this.listaUsuarios();
  }

  listaUsuarios() {
    this.seguridadSubscription = this._usuario
      .ListarUsuarios()
      .subscribe((response: MensajeSeguridadModel) => {
        this.DatosUsuarios = response.usuarios.length;
      });
  }

  itemsPerPage: number = 10;

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
  }

  ngOnDestroy(): void {
    if (this.seguridadSubscription) {
      this.seguridadSubscription.unsubscribe();
    }
  }
}
