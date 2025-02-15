import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { RequestAnularInventario } from 'src/app/Domain/models/inventarios/requestAnularInventario.model';
import { ResponseAnularInventario } from 'src/app/Domain/models/inventarios/responseAnularInventario.model';
import { AnularInventarioUseCase } from 'src/app/Domain/use-case/inventarios/anular-inventario-use-case';
import Swal from 'sweetalert2';

@Component({
  selector: 'button-anular-inventario',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './button-anular-inventario.component.html',
  styleUrl: './button-anular-inventario.component.css'
})
export class ButtonAnularInventarioComponent {

  @Input() datosInventario: inventariosModel = {} as inventariosModel;
  @Input() rucempresa: string = ''
  @Input() idcarga: number = 0

  @Output() obtenerDetalle = new EventEmitter<{ rucempresa: string; idcarga: number }>();

  ObtenerDetatosInventarios() {
    this.obtenerDetalle.emit({ rucempresa: this.rucempresa, idcarga: this.idcarga });
  }

    private readonly ObjectInventarioAnular = inject(AnularInventarioUseCase);



    ResponseAnularInventarioInventarioSeleccionado(): void {
      const rucempresa = this.datosInventario.rucempresa
      const usuarioAnulador: string = sessionStorage.getItem('user') || 'System'
      const idcarga: number = this.datosInventario.idcarga
      const estado: string = '0'
      const reqDatos: RequestAnularInventario = { rucempresa, idcarga, usuarioAnulador, estado };

      reqDatos.usuarioAnulador = usuarioAnulador
      reqDatos.rucempresa = rucempresa
      reqDatos.idcarga = idcarga

      this.ObjectInventarioAnular.anularInventario(reqDatos).subscribe(
        (response: ResponseAnularInventario) => {
          if (response.exito = true) {
            Swal.fire({
              title: "Anulado!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo anular el inventario, intente nuevamente",
            });
          }
        }
      );
    }

    anularInventario(): void {
      Swal.fire({
        title: "Se anulará el inventario",
        text: "¿Estás seguro de anular este inventario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Anular"
      }).then((result) => {
        if (result.isConfirmed) {
          this.ResponseAnularInventarioInventarioSeleccionado()
        }
      });
    }


}
