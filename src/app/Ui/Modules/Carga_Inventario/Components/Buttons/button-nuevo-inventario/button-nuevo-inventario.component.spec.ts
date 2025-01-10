import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNuevoInventarioComponent } from './button-nuevo-inventario.component';

describe('ButtonNuevoInventarioComponent', () => {
  let component: ButtonNuevoInventarioComponent;
  let fixture: ComponentFixture<ButtonNuevoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonNuevoInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonNuevoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
