import { Component, inject } from '@angular/core';
import jsPDF from 'jspdf';
import { inventariosModel } from '../../../../../Domain/models/inventarios/inventarios.models';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { InventariosUseCases } from '../../../../../Domain/use-case/inventarios/get-inventarios-useCase';
import { InventariosByIdUseCases } from '../../../../../Domain/use-case/inventarios/get-inventarioById-useCase';
import { detalleCarga } from '../../../../../Domain/models/cargaDatos/cargaDatos.model';

@Component({
  selector: 'modal-reporte-detalle-inventario',
  standalone: true,
  imports: [],
  templateUrl: './modal-reporte-detalle-inventario.component.html',
  styleUrl: './modal-reporte-detalle-inventario.component.css'
})
export class ModalReporteDetalleInventarioComponent {



}
