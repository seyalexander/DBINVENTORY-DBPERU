import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsignarPageComponent } from './lista-asignar-page.component';

describe('ListaAsignarPageComponent', () => {
  let component: ListaAsignarPageComponent;
  let fixture: ComponentFixture<ListaAsignarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAsignarPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAsignarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
