import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoButtonsHeaderCargaDatosComponent } from './grupo-buttons-header-carga-datos.component';

describe('GrupoButtonsHeaderCargaDatosComponent', () => {
  let component: GrupoButtonsHeaderCargaDatosComponent;
  let fixture: ComponentFixture<GrupoButtonsHeaderCargaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoButtonsHeaderCargaDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoButtonsHeaderCargaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
