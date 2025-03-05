import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosCheckboxAjustesComponent } from './filtros-checkbox-ajustes.component';

describe('FiltrosCheckboxAjustesComponent', () => {
  let component: FiltrosCheckboxAjustesComponent;
  let fixture: ComponentFixture<FiltrosCheckboxAjustesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosCheckboxAjustesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrosCheckboxAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
