import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCargaInventarioComponent } from './header-carga-inventario.component';

describe('HeaderCargaInventarioComponent', () => {
  let component: HeaderCargaInventarioComponent;
  let fixture: ComponentFixture<HeaderCargaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCargaInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderCargaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
