import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesHeaderUsuarioComponent } from './opciones-header-usuario.component';

describe('OpcionesHeaderUsuarioComponent', () => {
  let component: OpcionesHeaderUsuarioComponent;
  let fixture: ComponentFixture<OpcionesHeaderUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesHeaderUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionesHeaderUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
