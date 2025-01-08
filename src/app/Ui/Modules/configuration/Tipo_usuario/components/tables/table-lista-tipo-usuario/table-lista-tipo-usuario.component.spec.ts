import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListaTipoUsuarioComponent } from './table-lista-tipo-usuario.component';

describe('TableListaTipoUsuarioComponent', () => {
  let component: TableListaTipoUsuarioComponent;
  let fixture: ComponentFixture<TableListaTipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListaTipoUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableListaTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
