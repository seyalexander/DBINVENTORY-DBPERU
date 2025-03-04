import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaUsuarioEnviarComponent } from './tarjeta-usuario-enviar.component';

describe('TarjetaUsuarioEnviarComponent', () => {
  let component: TarjetaUsuarioEnviarComponent;
  let fixture: ComponentFixture<TarjetaUsuarioEnviarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaUsuarioEnviarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaUsuarioEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
