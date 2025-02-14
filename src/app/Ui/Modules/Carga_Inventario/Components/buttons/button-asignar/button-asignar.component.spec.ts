import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAsignarComponent } from './button-asignar.component';

describe('ButtonAsignarComponent', () => {
  let component: ButtonAsignarComponent;
  let fixture: ComponentFixture<ButtonAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
