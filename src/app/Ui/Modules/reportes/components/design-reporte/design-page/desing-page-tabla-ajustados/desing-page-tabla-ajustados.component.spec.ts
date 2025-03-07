import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesingPageTablaAjustadosComponent } from './desing-page-tabla-ajustados.component';

describe('DesingPageTablaAjustadosComponent', () => {
  let component: DesingPageTablaAjustadosComponent;
  let fixture: ComponentFixture<DesingPageTablaAjustadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesingPageTablaAjustadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesingPageTablaAjustadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
