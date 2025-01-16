import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonIconAsignarComponent } from './button-icon-asignar.component';

describe('ButtonIconAsignarComponent', () => {
  let component: ButtonIconAsignarComponent;
  let fixture: ComponentFixture<ButtonIconAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonIconAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonIconAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
