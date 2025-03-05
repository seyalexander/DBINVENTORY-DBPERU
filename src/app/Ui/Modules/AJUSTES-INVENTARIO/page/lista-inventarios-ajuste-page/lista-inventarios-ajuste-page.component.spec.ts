import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInventariosAjustePageComponent } from './lista-inventarios-ajuste-page.component';

describe('ListaInventariosAjustePageComponent', () => {
  let component: ListaInventariosAjustePageComponent;
  let fixture: ComponentFixture<ListaInventariosAjustePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaInventariosAjustePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaInventariosAjustePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
