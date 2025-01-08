import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasEmpresasComponent } from './listas-empresas.component';

describe('ListasEmpresasComponent', () => {
  let component: ListasEmpresasComponent;
  let fixture: ComponentFixture<ListasEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListasEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
