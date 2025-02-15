import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAnularInventarioComponent } from './button-anular-inventario.component';

describe('ButtonAnularInventarioComponent', () => {
  let component: ButtonAnularInventarioComponent;
  let fixture: ComponentFixture<ButtonAnularInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAnularInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAnularInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
