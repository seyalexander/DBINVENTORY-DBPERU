import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListaEmpresasComponent } from './table-lista-empresas.component';

describe('TableListaEmpresasComponent', () => {
  let component: TableListaEmpresasComponent;
  let fixture: ComponentFixture<TableListaEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListaEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableListaEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
