import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAjustesInventarioDatosComponent } from './tabla-ajustes-inventario-datos.component';

describe('TablaAjustesInventarioDatosComponent', () => {
  let component: TablaAjustesInventarioDatosComponent;
  let fixture: ComponentFixture<TablaAjustesInventarioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaAjustesInventarioDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaAjustesInventarioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
