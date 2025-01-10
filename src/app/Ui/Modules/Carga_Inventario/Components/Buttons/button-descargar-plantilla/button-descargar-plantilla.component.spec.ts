import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDescargarPlantillaComponent } from './button-descargar-plantilla.component';

describe('ButtonDescargarPlantillaComponent', () => {
  let component: ButtonDescargarPlantillaComponent;
  let fixture: ComponentFixture<ButtonDescargarPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDescargarPlantillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonDescargarPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
