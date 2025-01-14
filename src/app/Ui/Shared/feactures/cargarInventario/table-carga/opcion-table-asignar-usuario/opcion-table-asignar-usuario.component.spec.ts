import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionTableAsignarUsuarioComponent } from './opcion-table-asignar-usuario.component';

describe('OpcionTableAsignarUsuarioComponent', () => {
  let component: OpcionTableAsignarUsuarioComponent;
  let fixture: ComponentFixture<OpcionTableAsignarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionTableAsignarUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionTableAsignarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
