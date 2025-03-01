import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioLogueadoPageComponent } from './usuario-logueado-page.component';

describe('UsuarioLogueadoPageComponent', () => {
  let component: UsuarioLogueadoPageComponent;
  let fixture: ComponentFixture<UsuarioLogueadoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioLogueadoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioLogueadoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
