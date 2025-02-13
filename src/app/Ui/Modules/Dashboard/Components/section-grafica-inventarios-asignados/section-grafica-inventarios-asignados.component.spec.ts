import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGraficaInventariosAsignadosComponent } from './section-grafica-inventarios-asignados.component';

describe('SectionGraficaInventariosAsignadosComponent', () => {
  let component: SectionGraficaInventariosAsignadosComponent;
  let fixture: ComponentFixture<SectionGraficaInventariosAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionGraficaInventariosAsignadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionGraficaInventariosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
