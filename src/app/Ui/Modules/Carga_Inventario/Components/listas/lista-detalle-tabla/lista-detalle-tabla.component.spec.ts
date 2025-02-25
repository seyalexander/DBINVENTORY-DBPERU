import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDetalleTablaComponent } from './lista-detalle-tabla.component';

describe('ListaDetalleTablaComponent', () => {
  let component: ListaDetalleTablaComponent;
  let fixture: ComponentFixture<ListaDetalleTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDetalleTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDetalleTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
