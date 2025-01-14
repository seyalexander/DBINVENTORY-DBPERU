import { Component, inject } from '@angular/core';
import { CargaDatosService } from 'src/app/Infraestructure/driven-adapter/carga_datos/carga-datos.service';
import { ButtonDescargaComponent } from 'src/app/Ui/Shared/Components/buttons/button-descarga/button-descarga.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'button-descargar-plantilla',
  standalone: true,
  imports: [ButtonDescargaComponent],
  templateUrl: './button-descargar-plantilla.component.html',
  styleUrl: './button-descargar-plantilla.component.css',
})
export class ButtonDescargarPlantillaComponent {


  private readonly DescargarPlantillaExcel = inject(CargaDatosService);

  BtndescargarPlantilla(): void {
    this.DescargarPlantillaExcel.DowloadCargaDatos().subscribe({
      next: (response) => {
        const blob = response;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Plantilla_DbInventory.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.mensajeDescargaCorrecta();
      },
      error: (err) => {
        console.error('Error al descargar archivo', err);
      },
    });
  }

  mensajeDescargaCorrecta(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Archivo descargado exitosamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
