import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCerrarComponent } from './button-cerrar.component';

describe('ButtonCerrarComponent', () => {
  let component: ButtonCerrarComponent;
  let fixture: ComponentFixture<ButtonCerrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCerrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonCerrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
