import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartadoDerechoComponent } from './apartado-derecho.component';

describe('ApartadoDerechoComponent', () => {
  let component: ApartadoDerechoComponent;
  let fixture: ComponentFixture<ApartadoDerechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartadoDerechoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartadoDerechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
