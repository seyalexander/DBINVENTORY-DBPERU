import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaInventarioPageComponent } from './carga-inventario-page.component';

describe('CargaInventarioPageComponent', () => {
  let component: CargaInventarioPageComponent;
  let fixture: ComponentFixture<CargaInventarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaInventarioPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaInventarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
