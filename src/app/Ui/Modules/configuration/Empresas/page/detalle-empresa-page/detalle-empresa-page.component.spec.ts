import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmpresaPageComponent } from './detalle-empresa-page.component';

describe('DetalleEmpresaPageComponent', () => {
  let component: DetalleEmpresaPageComponent;
  let fixture: ComponentFixture<DetalleEmpresaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEmpresaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleEmpresaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
