import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargaDatosComponent } from './modal-carga-datos.component';

describe('ModalCargaDatosComponent', () => {
  let component: ModalCargaDatosComponent;
  let fixture: ComponentFixture<ModalCargaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCargaDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCargaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
