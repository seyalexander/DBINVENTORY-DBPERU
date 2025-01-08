import { Component, Input } from '@angular/core';

@Component({
  selector: 'carousel-img',
  standalone: true,
  imports: [],
  templateUrl: './carousel-img.component.html',
  styleUrl: './carousel-img.component.css'
})
export class CarouselImgComponent {
  @Input() imagen_a: string = '';
  @Input() imagen_b: string = '';
  @Input() imagen_c: string = '';
  @Input() imagen_d: string = '';
  @Input() imagen_e: string = '';
}
