import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdEstadoCargaInventarioComponent } from './td-estado-carga-inventario.component';

describe('TdEstadoCargaInventarioComponent', () => {
  let component: TdEstadoCargaInventarioComponent;
  let fixture: ComponentFixture<TdEstadoCargaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdEstadoCargaInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdEstadoCargaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
