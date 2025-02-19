import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesComponent } from './asignaciones.component';

describe('AsignacionesComponent', () => {
  let component: AsignacionesComponent;
  let fixture: ComponentFixture<AsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
