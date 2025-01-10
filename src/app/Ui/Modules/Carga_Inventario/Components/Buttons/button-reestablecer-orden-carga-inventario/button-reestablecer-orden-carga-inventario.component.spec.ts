import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReestablecerOrdenCargaInventarioComponent } from './button-reestablecer-orden-carga-inventario.component';

describe('ButtonReestablecerOrdenCargaInventarioComponent', () => {
  let component: ButtonReestablecerOrdenCargaInventarioComponent;
  let fixture: ComponentFixture<ButtonReestablecerOrdenCargaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonReestablecerOrdenCargaInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonReestablecerOrdenCargaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
