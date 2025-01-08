import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTableEstadoActivoComponent } from './body-table-estado-activo.component';

describe('BodyTableEstadoActivoComponent', () => {
  let component: BodyTableEstadoActivoComponent;
  let fixture: ComponentFixture<BodyTableEstadoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTableEstadoActivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyTableEstadoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
