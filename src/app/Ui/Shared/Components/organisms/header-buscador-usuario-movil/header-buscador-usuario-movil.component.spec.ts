import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBuscadorUsuarioMovilComponent } from './header-buscador-usuario-movil.component';

describe('HeaderBuscadorUsuarioMovilComponent', () => {
  let component: HeaderBuscadorUsuarioMovilComponent;
  let fixture: ComponentFixture<HeaderBuscadorUsuarioMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBuscadorUsuarioMovilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderBuscadorUsuarioMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
