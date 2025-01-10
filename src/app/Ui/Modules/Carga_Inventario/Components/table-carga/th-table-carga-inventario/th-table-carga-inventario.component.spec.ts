import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThTableCargaInventarioComponent } from './th-table-carga-inventario.component';

describe('ThTableCargaInventarioComponent', () => {
  let component: ThTableCargaInventarioComponent;
  let fixture: ComponentFixture<ThTableCargaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThTableCargaInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThTableCargaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
