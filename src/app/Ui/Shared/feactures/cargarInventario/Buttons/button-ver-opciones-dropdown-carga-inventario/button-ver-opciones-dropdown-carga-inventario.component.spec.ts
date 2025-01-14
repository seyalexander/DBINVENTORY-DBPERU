import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonVerOpcionesDropdownCargaInventarioComponent } from './button-ver-opciones-dropdown-carga-inventario.component';

describe('ButtonVerOpcionesDropdownCargaInventarioComponent', () => {
  let component: ButtonVerOpcionesDropdownCargaInventarioComponent;
  let fixture: ComponentFixture<ButtonVerOpcionesDropdownCargaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonVerOpcionesDropdownCargaInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonVerOpcionesDropdownCargaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
