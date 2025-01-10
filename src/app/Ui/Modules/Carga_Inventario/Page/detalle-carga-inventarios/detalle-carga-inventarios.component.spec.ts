import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCargaInventariosComponent } from './detalle-carga-inventarios.component';

describe('DetalleCargaInventariosComponent', () => {
  let component: DetalleCargaInventariosComponent;
  let fixture: ComponentFixture<DetalleCargaInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCargaInventariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleCargaInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
