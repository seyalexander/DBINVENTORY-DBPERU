import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOpcionesComponent } from './section-opciones.component';

describe('SectionOpcionesComponent', () => {
  let component: SectionOpcionesComponent;
  let fixture: ComponentFixture<SectionOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionOpcionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
