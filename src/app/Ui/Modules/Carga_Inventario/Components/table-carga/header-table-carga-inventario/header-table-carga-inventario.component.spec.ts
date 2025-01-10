import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTableCargaInventarioComponent } from './header-table-carga-inventario.component';

describe('HeaderTableCargaInventarioComponent', () => {
  let component: HeaderTableCargaInventarioComponent;
  let fixture: ComponentFixture<HeaderTableCargaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTableCargaInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderTableCargaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
