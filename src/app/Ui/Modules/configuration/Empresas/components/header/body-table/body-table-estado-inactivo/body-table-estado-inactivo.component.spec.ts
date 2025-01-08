import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTableEstadoInactivoComponent } from './body-table-estado-inactivo.component';

describe('BodyTableEstadoInactivoComponent', () => {
  let component: BodyTableEstadoInactivoComponent;
  let fixture: ComponentFixture<BodyTableEstadoInactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTableEstadoInactivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyTableEstadoInactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
