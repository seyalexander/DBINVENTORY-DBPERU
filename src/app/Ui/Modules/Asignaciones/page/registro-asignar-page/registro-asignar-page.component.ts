import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { inventariosModel } from 'src/app/Domain/models/inventarios/inventarios.models';
import { RequestAsignarUsuario } from 'src/app/Domain/models/inventarios/requestAsignarUsuario.model';
import { SeguridadModel } from 'src/app/Domain/models/seguridad/seguridad.model';
import { UpdateUsuarioAsignadoUseCase } from 'src/app/Domain/use-case/inventarios/update-usuarioAsignado-useCase';
import Swal from 'sweetalert2';

@Component({
  selector: 'registro-asignar-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './registro-asignar-page.component.html',
  styleUrl: './registro-asignar-page.component.css'
})
export class RegistroAsignarPageComponent {

  // ================================================================================
  // DECORADORES
  // ================================================================================
  @Input() getUsuarios_All: Array<SeguridadModel> = [];
  @Input() rucEmpresa: string = '';
  @Input() idCarga: number = 0;
  @Input() usuarios: any[] = [];
  @Input() requUser: RequestAsignarUsuario = {} as RequestAsignarUsuario
  @Input() UsuarioAsignado: string = ""
  @Input() Inventario: String = ""

  // ================================================================================
  // INYECCIÓN DE SERVICIOS
  // ================================================================================

  private readonly updateUsuarioAsignadoUseCase = inject(UpdateUsuarioAsignadoUseCase)

  selectedUsuarioId: number | null = null;
  currentDate: string = new Date().toLocaleDateString();

  inventario: SeguridadModel = new SeguridadModel();
  usuarioAsignado: RequestAsignarUsuario = new RequestAsignarUsuario()
  formularioRegistro: FormGroup = new FormGroup({});

  // ================================================================================
  // FUNCIÓN ASIGNACIÓN
  // ================================================================================
  validacionUsuarioAsignacion() {
    this.UsuarioAsignado ? this.Alert_AsignarUsuario(this.Inventario, this.UsuarioAsignado) : this.onAsignarUsuario()
  }

  onAsignarUsuario() {
    const formAsignacion = this.requUser
    formAsignacion.idcarga = this.idCarga
    formAsignacion.rucempresa = this.rucEmpresa.toString()
    formAsignacion.usuarioasignado = this.inventario.idusuario.toString()

    this.updateUsuarioAsignadoUseCase
      .updateUsuarioAsignado(formAsignacion)
      .subscribe((response: any) => {
        if (response.exito) {
          this.mensajeValidacionRegistroCorrecto(response)
        }
        if (!response.exito) {
          this.mensajeValidacionRegistroIncorrecto(response.msgerror)
        }
      });
  }

  // ================================================================================
  // SWEET ALERT
  // ================================================================================
  mensajeValidacionRegistroCorrecto(response: any) {
    const message = response?.message || 'Inventario reasignado correctamente.';

    Swal.fire({
      icon: "success", // ✅ Usa el icono de confirmación de SweetAlert2
      title: "¡Éxito!",
      html: `
        <p class="text-gray-700 text-lg font-medium text-center px-4 leading-relaxed">
          ${message}
        </p>

        <p class="text-gray-500 text-sm text-center mt-2">
          La página se recargará automáticamente...
        </p>
      `,
      background: "#ffffff", // Fondo limpio
      customClass: {
        popup: 'swal-custom-popup',
        title: 'text-green-600 font-bold text-xl', // Título más destacado
      },
      showConfirmButton: false, // Ocultar botón de confirmación
      timer: 2500, // Espera 2.5 segundos antes de recargar
      didClose: () => {
        window.location.reload();
      },
    });
  }





  mensajeValidacionRegistroIncorrecto(response: any) {
    const message =
      response
        ? response.msgerror
        : 'Error al asignar';
    Swal.fire(response, message, 'error').then(() => {
      window.location.reload();
    });
  }

  cerrarRegistro(): void {
    this.formularioRegistro.reset();
    this.formularioRegistro.markAsPristine();
    this.formularioRegistro.markAsUntouched();
  }


    Alert_AsignarUsuario(descripcion:String, asignado: string) {
      let countdown = 3; // Cuenta regresiva inicial

      Swal.fire({
        title: `
          <div class="text-blue-600 text-2xl font-bold flex items-center justify-center">
            <span>Reasignar Usuario</span>
          </div>
        `,
        html: `
          <div class="border-b border-gray-300 pb-4">
            <p class="text-gray-700 text-lg text-center">
              ¿Seguro que deseas reasignar el inventario
              <span class="font-bold text-blue-500">${descripcion}</span>
              al usuario
              <span class="font-bold text-blue-500">${asignado}</span>?
            </p>
          </div>

          <div class="mt-2 text-center space-y-3">
            <p class="text-gray-600 text-sm">Esta acción actualizará la asignación del usuario.</p>
          </div>

          <!-- Contenedor de botones -->
          <div id="swal-buttons" class="flex justify-center gap-4 mt-5">
            <button id="cancel-btn" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded w-36">
              Cancelar
            </button>
            <button id="confirm-btn" class="bg-blue-600 text-white font-semibold px-4 py-2 rounded w-36" disabled>
              Reasignar (3)
            </button>
          </div>
        `,
        icon: "warning",
        showConfirmButton: false, // Ocultar botones de SweetAlert
        showCancelButton: false,
        didOpen: () => {
          const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;
          const confirmBtn = document.getElementById("confirm-btn") as HTMLButtonElement;

          if (cancelBtn) {
            cancelBtn.onclick = () => Swal.close(); // Cierra la alerta
          }

          // Iniciar cuenta regresiva
          const interval = setInterval(() => {
            countdown--;
            confirmBtn.textContent = `Reasignar (${countdown})`;

            if (countdown === 0) {
              clearInterval(interval);
              confirmBtn.textContent = "Reasignar";
              confirmBtn.disabled = false;
              confirmBtn.classList.add("hover:bg-blue-700"); // Activa el hover
            }
          }, 1000);

          if (confirmBtn) {
            confirmBtn.onclick = () => {
              Swal.close();
              this.onAsignarUsuario(); // Llamar función de reasignación
            };
          }
        },
      });
    }


  // ================================================================================
  // DESTRUCCIÓN DE SUBSCRIPCIONES
  // ================================================================================
  ngOnInit(): void {
    this.formularioRegistro = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
    });


  }
}
