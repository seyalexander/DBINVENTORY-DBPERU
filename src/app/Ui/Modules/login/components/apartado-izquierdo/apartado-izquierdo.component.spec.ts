import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartadoIzquierdoComponent } from './apartado-izquierdo.component';

describe('ApartadoIzquierdoComponent', () => {
  let component: ApartadoIzquierdoComponent;
  let fixture: ComponentFixture<ApartadoIzquierdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartadoIzquierdoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartadoIzquierdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
