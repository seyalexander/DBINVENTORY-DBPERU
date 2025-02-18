import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCantidadregistroInventariosComponent } from './section-cantidadregistro-inventarios.component';

describe('SectionCantidadregistroInventariosComponent', () => {
  let component: SectionCantidadregistroInventariosComponent;
  let fixture: ComponentFixture<SectionCantidadregistroInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCantidadregistroInventariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionCantidadregistroInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
