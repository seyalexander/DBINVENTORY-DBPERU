import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdDescripcionAsignarComponent } from './td-descripcion-asignar.component';

describe('TdDescripcionAsignarComponent', () => {
  let component: TdDescripcionAsignarComponent;
  let fixture: ComponentFixture<TdDescripcionAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdDescripcionAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdDescripcionAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
