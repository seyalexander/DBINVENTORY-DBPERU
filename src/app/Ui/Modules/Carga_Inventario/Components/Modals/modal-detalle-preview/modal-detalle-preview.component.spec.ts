import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallePreviewComponent } from './modal-detalle-preview.component';

describe('ModalDetallePreviewComponent', () => {
  let component: ModalDetallePreviewComponent;
  let fixture: ComponentFixture<ModalDetallePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetallePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDetallePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
