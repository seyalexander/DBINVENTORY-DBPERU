import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUsuarioLogueadoComponent } from './button-usuario-logueado.component';

describe('ButtonUsuarioLogueadoComponent', () => {
  let component: ButtonUsuarioLogueadoComponent;
  let fixture: ComponentFixture<ButtonUsuarioLogueadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonUsuarioLogueadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonUsuarioLogueadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
