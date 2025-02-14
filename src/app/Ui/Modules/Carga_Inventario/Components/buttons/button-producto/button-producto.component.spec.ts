import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonProductoComponent } from './button-producto.component';

describe('ButtonProductoComponent', () => {
  let component: ButtonProductoComponent;
  let fixture: ComponentFixture<ButtonProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
