import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageReporteInventarioComponent } from './header-page-reporte-inventario.component';

describe('HeaderPageReporteInventarioComponent', () => {
  let component: HeaderPageReporteInventarioComponent;
  let fixture: ComponentFixture<HeaderPageReporteInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPageReporteInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderPageReporteInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
