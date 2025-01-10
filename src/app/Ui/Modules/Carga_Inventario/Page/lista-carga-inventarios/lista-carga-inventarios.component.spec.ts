import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCargaInventariosComponent } from './lista-carga-inventarios.component';

describe('ListaCargaInventariosComponent', () => {
  let component: ListaCargaInventariosComponent;
  let fixture: ComponentFixture<ListaCargaInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCargaInventariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaCargaInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
