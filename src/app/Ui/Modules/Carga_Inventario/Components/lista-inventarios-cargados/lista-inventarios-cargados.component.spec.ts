import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInventariosCargadosComponent } from './lista-inventarios-cargados.component';

describe('ListaInventariosCargadosComponent', () => {
  let component: ListaInventariosCargadosComponent;
  let fixture: ComponentFixture<ListaInventariosCargadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaInventariosCargadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaInventariosCargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
