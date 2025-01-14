import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaModuloPageComponent } from './lista-modulo-page.component';

describe('ListaModuloPageComponent', () => {
  let component: ListaModuloPageComponent;
  let fixture: ComponentFixture<ListaModuloPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaModuloPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaModuloPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
