import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuOpcionesGeneralComponent } from './menu-opciones.component';



describe('MenuOpcionesComponent', () => {
  let component: MenuOpcionesGeneralComponent;
  let fixture: ComponentFixture<MenuOpcionesGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOpcionesGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOpcionesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
