import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCargaInventariosComponent } from './registro-carga-inventarios.component';

describe('RegistroCargaInventariosComponent', () => {
  let component: RegistroCargaInventariosComponent;
  let fixture: ComponentFixture<RegistroCargaInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCargaInventariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroCargaInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
