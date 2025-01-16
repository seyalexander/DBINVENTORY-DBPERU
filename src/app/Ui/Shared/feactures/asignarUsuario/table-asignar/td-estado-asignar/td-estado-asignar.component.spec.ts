import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdEstadoAsignarComponent } from './td-estado-asignar.component';

describe('TdEstadoAsignarComponent', () => {
  let component: TdEstadoAsignarComponent;
  let fixture: ComponentFixture<TdEstadoAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdEstadoAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdEstadoAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
