import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFiltroAsignacionComponent } from './header-filtro-asignacion.component';

describe('HeaderFiltroAsignacionComponent', () => {
  let component: HeaderFiltroAsignacionComponent;
  let fixture: ComponentFixture<HeaderFiltroAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFiltroAsignacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderFiltroAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
