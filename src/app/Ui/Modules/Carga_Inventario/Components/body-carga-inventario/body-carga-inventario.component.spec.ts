import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCargaInventarioComponent } from './body-carga-inventario.component';

describe('BodyCargaInventarioComponent', () => {
  let component: BodyCargaInventarioComponent;
  let fixture: ComponentFixture<BodyCargaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyCargaInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyCargaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
