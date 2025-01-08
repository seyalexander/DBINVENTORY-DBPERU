import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionInventarioComponent } from './asignacion-inventario.component';

describe('AsignacionInventarioComponent', () => {
  let component: AsignacionInventarioComponent;
  let fixture: ComponentFixture<AsignacionInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignacionInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
