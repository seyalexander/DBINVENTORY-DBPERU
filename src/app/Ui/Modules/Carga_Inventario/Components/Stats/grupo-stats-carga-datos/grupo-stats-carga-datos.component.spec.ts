import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoStatsCargaDatosComponent } from './grupo-stats-carga-datos.component';

describe('GrupoStatsCargaDatosComponent', () => {
  let component: GrupoStatsCargaDatosComponent;
  let fixture: ComponentFixture<GrupoStatsCargaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoStatsCargaDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoStatsCargaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
